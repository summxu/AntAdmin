import { AnyAction } from 'redux';
import { EffectsCommandMap } from 'dva';
import { message } from 'antd';
import { fakeSubmitForm, getConfig } from './service';

export type Effect = (
  action: AnyAction,
  effects: EffectsCommandMap & { select: <T>(func: (state: {}) => T) => T },
) => void;

export interface ModelType {
  namespace: string;
  state: any;
  reducers: any;
  effects: {
    submitRegularForm: Effect,
    getConfig: Effect
  };
}
const Model: ModelType = {
  namespace: 'systemAndBeaufity',

  state: {
    fieldValue: {}
  },

  reducers: {
    saveConfig(state: any, action: any) {
      return {
        ...state,
        fieldValue: action.payload
      }
    },
    saveFormConfig(state: any, action: any) {
      return {
        ...state,
        [action.payload.key]: action.payload.value
      }
    }
  },

  effects: {
    * submitRegularForm({ payload }, { call, select }) {
      const id = yield select((state: any) => state.systemAndBeaufity.fieldValue.id)
      try {
        payload = {
          ...payload,
          id
        }
        const res = yield call(fakeSubmitForm, payload);
        message.success(res.message);
      } catch (error) {
        console.log(error)
      }
    },
    * getConfig({ payload }, { call, put }) {
      try {
        const res = yield call(getConfig);
        yield put({
          type: 'saveConfig',
          payload: res.data
        })
      } catch (error) {
        console.log(error)
      }
    }
  },
};

export default Model;

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
  namespace: 'systemAndWithdraw',

  state: {
    fieldValue: {}
  },

  reducers: {
    saveConfig(state: any, action: any) {
      return {
        ...state,
        fieldValue: action.payload
      }
    }
  },

  effects: {
    * submitRegularForm({ payload }, { call, select }) {
      const id = yield select((state: any) => state.systemAndWithdraw.fieldValue.id)
      try {
        payload = {
          ...payload,
          id,
          power: payload.power ? 1 : 0
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
          payload: {
            ...res.data,
            power: res.data.power ? true : false
          }
        })
      } catch (error) {
        console.log(error)
      }
    }
  },
};

export default Model;

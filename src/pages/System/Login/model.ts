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
  namespace: 'systemAndLogin',

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
      const id = yield select((state: any) => state.systemAndLogin.fieldValue.id)
      try {
        payload = {
          ...payload,
          id,
          loginPower: payload.loginPower ? 1 : 0,
          smsPower: payload.smsPower ? 1 : 0,
          smsIpPower: payload.smsIpPower ? 1 : 0
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
            loginPower: res.data.loginPower ? true : false,
            smsPower: res.data.smsPower ? true : false,
            smsIpPower: res.data.smsIpPower ? true : false
          }
        })
      } catch (error) {
        console.log(error)
      }
    }
  },
};

export default Model;

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
  namespace: 'systemAndPay',

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
      const id = yield select((state: any) => state.systemAndPay.fieldValue.id)
      try {
        /* boolean to int */
        payload = {
          ...payload,
          id,
          aliPower: payload.aliPower ? 1 : 0,
          aliPcPower: payload.aliPcPower ? 1 : 0,
          weixinPcPower: payload.weixinPcPower ? 1 : 0,
          weixinPower: payload.weixinPower ? 1 : 0
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
          /* int to boolean */
          payload: {
            ...res.data,
            aliPower: res.data.aliPower ? true : false,
            aliPcPower: res.data.aliPcPower ? true : false,
            weixinPcPower: res.data.weixinPcPower ? true : false,
            weixinPower: res.data.weixinPower ? true : false
          }
        })
      } catch (error) {
        console.log(error)
      }
    }
  },
};

export default Model;

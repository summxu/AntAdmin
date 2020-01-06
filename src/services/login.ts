/*
 * @Auth: Chenxu
 * @Date: 2019-12-10 16:14:47
 * @LastEditTime : 2020-01-06 17:41:34
 */
import request from '@/utils/request';

export interface LoginParamsType {
  username: string;
  password: string;
  code: string;
  captcha: string;
}

export async function fakeAccountLogin(params: LoginParamsType) {
  return request('/api/login/account', {
    method: 'POST',
    data: params,
  });
}
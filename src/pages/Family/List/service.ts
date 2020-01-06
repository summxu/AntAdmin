/*
 * @Auth: Chenxu
 * @Date: 2019-12-22 11:20:09
 * @LastEditTime : 2019-12-22 13:53:02
 */
import request from '@/utils/request';
import { TableListParams } from './data.d';

/* 请求列表 */
export async function queryRule(data?: TableListParams) {
  return request('/api/family/list', {
    method: 'POST',
    data
  });
}

export async function cancel_sign(data: any) {
  return request('/api/family/an_refuse', {
    method: 'POST',
    data
  });
}

export async function sign(data: any) {
  return request('/api/family/refuse', {
    method: 'POST',
    data
  });
}
export async function commit(data: any) {
  return request('/api/family/commit', {
    method: 'POST',
    data
  });
}
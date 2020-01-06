/*
 * @Auth: Chenxu
 * @Date: 2019-12-18 11:50:53
 * @LastEditTime: 2019-12-18 14:06:48
 */
import request from '@/utils/request';
import { TableListParams } from './data.d';

/* 请求列表 */
export async function queryRule(data?: TableListParams) {
  return request('/api/report/list', {
    method: 'POST',
    data
  });
}

export async function cancel_sign(data: any) {
  return request('/api/report/disable', {
    method: 'POST',
    data
  });
}

export async function sign(data: any) {
  return request('/api/report/enable', {
    method: 'POST',
    data
  });
}

export async function over(data: any) {
  return request('/api/report/over', {
    method: 'POST',
    data
  });
}
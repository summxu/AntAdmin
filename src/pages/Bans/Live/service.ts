/*
 * @Auth: Chenxu
 * @Date: 2019-12-22 11:20:09
 * @LastEditTime : 2019-12-23 16:01:01
 */
import request from '@/utils/request';
import { TableListParams } from './data.d';

/* 请求列表 */
export async function queryRule(data?: TableListParams) {
  return request('/api/banned/anchor/list', {
    method: 'POST',
    data
  });
}

export async function cancel_sign(data: any) {
  return request('/api/banned/anchor/cancel', {
    method: 'POST',
    data
  });
}
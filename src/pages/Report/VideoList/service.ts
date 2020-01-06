/*
 * @Auth: Chenxu
 * @Date: 2019-12-18 11:50:53
 * @LastEditTime: 2019-12-18 14:11:35
 */
import request from '@/utils/request';
import { TableListParams } from './data.d';

/* 请求列表 */
export async function queryRule(data?: TableListParams) {
  return request('/api/video/report/list', {
    method: 'POST',
    data
  });
}

export async function cancel_sign(data: any) {
  return request('/api/video/report/down', {
    method: 'POST',
    data
  });
}

export async function over(data: any) {
  return request('/api/video/report/over', {
    method: 'POST',
    data
  });
}
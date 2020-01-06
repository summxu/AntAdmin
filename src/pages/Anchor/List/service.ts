import request from '@/utils/request';
import { TableListParams } from './data.d';

/* 请求列表 */
export async function queryRule(data?: TableListParams) {
  return request('/api/anchor/list', {
    method: 'POST',
    data
  });
}

export async function cancel_sign(data: any) {
  return request('/api/anchor/cancel_sign', {
    method: 'POST',
    data
  });
}

export async function sign(data: any) {
  return request('/api/anchor/sign', {
    method: 'POST',
    data
  });
}
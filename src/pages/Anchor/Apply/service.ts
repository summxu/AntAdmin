import request from '@/utils/request';
import { TableListParams } from './data.d';

/* 请求列表 */
export async function queryRule(data?: TableListParams) {
  return request('/api/anchor/apply/list', {
    method: 'POST',
    data
  });
}

export async function cancel_sign(data: any) {
  return request('/api/anchor/apply/an_refuse', {
    method: 'POST',
    data
  });
}

export async function sign(data: any) {
  return request('/api/anchor/apply/refuse', {
    method: 'POST',
    data
  });
}
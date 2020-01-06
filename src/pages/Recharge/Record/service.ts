/*
 * @Auth: Chenxu
 * @Date: 2019-12-18 09:06:14
 * @LastEditTime: 2019-12-18 17:08:22
 */
import request from '@/utils/request';

/* 请求列表 */
export async function queryRule(data: any) {
  return request('/api/recharge/list', {
    method: 'POST',
    data
  });
}

export async function exportExcel(data: any) {
  return request('/api/recharge/check/file', {
    method: 'GET',
    data
  });
}

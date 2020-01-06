/*
 * @Auth: Chenxu
 * @Date: 2019-12-23 10:15:56
 * @LastEditTime : 2019-12-23 10:38:59
 */
import request from '@/utils/request';

/* 请求列表 */
export async function queryRule(data: any) {
  return request('/api/recharge/manual/list', {
    method: 'POST',
    data
  });
}

export async function commit(data: any) {
  return request('/api/recharge/manual', {
    method: 'POST',
    data
  });
}

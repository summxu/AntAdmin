/*
 * @Auth: Chenxu
 * @Date: 2019-12-18 09:06:14
 * @LastEditTime: 2019-12-18 15:43:04
 */
import request from '@/utils/request';

/* 请求列表 */
export async function queryRule(data: any) {
  return request('/api/recharge/setmeal/list', {
    method: 'POST',
    data
  });
}

export async function commit(data: any) {
  return request('/api/recharge/setmeal/commit', {
    method: 'POST',
    data
  });
}

export async function remove(data: any) {
  return request('/api/recharge/setmeal/remove', {
    method: 'POST',
    data
  });
}

// 详情
export async function detail(data: any) {
  return request('/api/recharge/setmeal/detail', {
    method: 'POST',
    data
  });
}

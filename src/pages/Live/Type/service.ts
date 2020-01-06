/*
 * @Auth: Chenxu
 * @Date: 2019-12-18 09:06:14
 * @LastEditTime : 2019-12-23 14:07:52
 */
import request from '@/utils/request';

/* 请求列表 */
export async function queryRule(data: any) {
  return request('/api/live/type/list', {
    method: 'POST',
    data
  });
}

export async function commit(data: any) {
  return request('/api/live/type/commit', {
    method: 'POST',
    data
  });
}

export async function remove(data: any) {
  return request('/api/live/type/remove', {
    method: 'POST',
    data
  });
}

// 详情
export async function detail(data: any) {
  return request('/api/live/type/detail', {
    method: 'POST',
    data
  });
}

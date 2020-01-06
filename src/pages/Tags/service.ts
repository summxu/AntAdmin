/*
 * @Auth: Chenxu
 * @Date: 2019-12-18 09:06:14
 * @LastEditTime : 2019-12-23 13:37:36
 */
import request from '@/utils/request';

/* 请求列表 */
export async function queryRule(data: any) {
  return request('/api/tags/list', {
    method: 'POST',
    data
  });
}

export async function commit(data: any) {
  return request('/api/tags/commit', {
    method: 'POST',
    data
  });
}

export async function remove(data: any) {
  return request('/api/tags/disable', {
    method: 'POST',
    data
  });
}

// 详情
export async function detail(data: any) {
  return request('/api/tags/detail', {
    method: 'POST',
    data
  });
}

/*
 * @Auth: Chenxu
 * @Date: 2019-12-18 09:06:14
 * @LastEditTime: 2019-12-18 10:29:20
 */
import request from '@/utils/request';

/* 请求列表 */
export async function queryRule(data: any) {
  return request('/api/report/type/list', {
    method: 'POST',
    data
  });
}

export async function remove(data: any) {
  return request('/api/report/type/remove', {
    method: 'POST',
    data
  });
}

/* add */
export async function add(data: any) {
  return request('/api/report/type/commit', {
    method: 'POST',
    data
  });
}

export async function edit(data: any) {
  return request('/api/report/type/commit', {
    method: 'POST',
    data
  });
}

// 详情
export async function detail(data: any) {
  return request('/api/report/type/detail', {
    method: 'POST',
    data
  });
}

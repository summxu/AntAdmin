/*
 * @Auth: Chenxu
 * @Date: 2019-12-18 09:06:14
 * @LastEditTime : 2019-12-23 13:44:22
 */
import request from '@/utils/request';

/* 请求列表 */
export async function queryRule(data: any) {
  return request('/api/loginreward/list', {
    method: 'POST',
    data
  });
}

export async function commit(data: any) {
  return request('/api/loginreward/commit', {
    method: 'POST',
    data
  });
}

// 详情
export async function detail(data: any) {
  return request('/api/loginreward/detail', {
    method: 'POST',
    data
  });
}

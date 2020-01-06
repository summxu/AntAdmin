/*
 * @Auth: Chenxu
 * @Date: 2019-12-18 09:06:14
 * @LastEditTime : 2019-12-25 09:47:29
 */
import request from '@/utils/request';

/* 请求列表 */
export async function queryRule(data: any) {
  return request('/api/music/type/list', {
    method: 'POST',
    data
  });
}

export async function commit(data: any) {
  return request('/api/music/type/commit', {
    method: 'POST',
    data
  });
}

export async function remove(data: any) {
  return request('/api/music/type/remove', {
    method: 'POST',
    data
  });
}

// 详情
export async function detail(data: any) {
  return request('/api/music/type/detail', {
    method: 'POST',
    data
  });
}

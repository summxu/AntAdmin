/*
 * @Auth: Chenxu
 * @Date: 2019-12-18 09:06:14
 * @LastEditTime : 2019-12-23 15:02:57
 */
import request from '@/utils/request';

/* 请求列表 */
export async function queryRule(data: any) {
  return request('/api/gift/list', {
    method: 'POST',
    data
  });
}

export async function commit(data: any) {
  return request('/api/gift/commit', {
    method: 'POST',
    data
  });
}

export async function remove(data: any) {
  return request('/api/gift/remove', {
    method: 'POST',
    data
  });
}

// 详情
export async function detail(data: any) {
  return request('/api/gift/detail', {
    method: 'POST',
    data
  });
}

/*
 * @Auth: Chenxu
 * @Date: 2019-12-18 09:06:14
 * @LastEditTime: 2019-12-18 14:55:20
 */
import request from '@/utils/request';

/* 请求列表 */
export async function queryRule(data: any) {
  return request('/api/vip/list', {
    method: 'POST',
    data
  });
}

export async function commit(data: any) {
  return request('/api/vip/commit', {
    method: 'POST',
    data
  });
}

// 详情
export async function detail(data: any) {
  return request('/api/vip/detail', {
    method: 'POST',
    data
  });
}

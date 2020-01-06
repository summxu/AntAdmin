/*
 * @Auth: Chenxu
 * @Date: 2019-12-18 09:06:14
 * @LastEditTime : 2019-12-23 14:22:19
 */
import request from '@/utils/request';

/* 请求列表 */
export async function queryRule(data: any) {
  return request('/api/live/room/list', {
    method: 'POST',
    data
  });
}

export async function commit(data: any) {
  return request('/api/config/room/commit', {
    method: 'POST',
    data
  });
}

// 详情
export async function detail(data: any) {
  return request('/api/config/room/find', {
    method: 'POST',
    data
  });
}

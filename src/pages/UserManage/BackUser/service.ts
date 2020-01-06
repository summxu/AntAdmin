/*
 * @Auth: Chenxu
 * @Date: 2019-12-19 10:00:19
 * @LastEditTime : 2019-12-20 09:28:57
 */
import request from '@/utils/request';

/* 请求列表 */
export async function queryRule(data: any) {
  return request('/api/sys/user/list', {
    method: 'POST',
    data
  });
}

/* add */
export async function commit(data: any) {
  return request('/api/sys/user/commitUser', {
    method: 'POST',
    data
  });
}

export async function enable(data: any) {
  return request('/api/sys/user/enable', {
    method: 'POST',
    data
  });
}

export async function disable(data: any) {
  return request('/api/sys/user/disable', {
    method: 'POST',
    data
  });
}

// 详情
export async function detail(data: any) {
  return request('/api/sys/user/detail', {
    method: 'POST',
    data
  });
}

// 重置密码
export async function reset(data: any) {
  return request('/api/sys/user/reset', {
    method: 'POST',
    data
  });
}
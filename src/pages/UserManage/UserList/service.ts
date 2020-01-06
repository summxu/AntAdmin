/*
 * @Auth: Chenxu
 * @Date: 2019-12-19 10:00:19
 * @LastEditTime : 2019-12-20 09:28:57
 */
import request from '@/utils/request';

/* 请求列表 */
export async function queryRule(data: any) {
  return request('/api/member/list', {
    method: 'POST',
    data
  });
}

/* add */
export async function commit(data: any) {
  return request('/api/member/commit', {
    method: 'POST',
    data
  });
}

export async function enable(data: any) {
  return request('/api/member/enable', {
    method: 'POST',
    data
  });
}

export async function disable(data: any) {
  return request('/api/member/disable', {
    method: 'POST',
    data
  });
}

// 详情
export async function detail(data: any) {
  return request('/api/member/detail', {
    method: 'POST',
    data
  });
}

// 重置密码
export async function setSuper(data: any) {
  return request('/api/member/super', {
    method: 'POST',
    data
  });
}

export async function setDead(data: any) {
  return request('/api/member/dead', {
    method: 'POST',
    data
  });
}
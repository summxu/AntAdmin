import request from '@/utils/request';

/* 请求列表 */
export async function queryRule(data: any) {
  return request('/api/sys/menu/list', {
    method: 'POST',
    data
  });
}

export async function remove(data: any) {
  return request('/api/sys/menu/remove', {
    method: 'POST',
    data
  });
}

/* add */
export async function add(data: any) {
  return request('/api/sys/menu/add', {
    method: 'POST',
    data
  });
}

export async function edit(data: any) {
  return request('/api/sys/menu/edit', {
    method: 'POST',
    data
  });
}

// 详情
export async function detail(data: any) {
  return request('/api/sys/menu/detail', {
    method: 'POST',
    data
  });
}

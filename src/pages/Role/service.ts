import request from '@/utils/request';

/* 请求列表 */
export async function queryRule(data: any) {
  return request('/api/sys/role/list', {
    method: 'POST',
    data
  });
}

export async function enable(data: any) {
  return request('/api/sys/role/enable', {
    method: 'POST',
    data
  });
}

export async function disable(data: any) {
  return request('/api/sys/role/disable', {
    method: 'POST',
    data
  });
}

export async function commit(data: any) {
  return request('/api/sys/role/commit', {
    method: 'POST',
    data
  });
}

/* 提交权限 */
export async function commitTree(data: any) {
  return request('/api/sys/role/commitTree', {
    method: 'POST',
    data
  });
}

/* 菜单树 */
export async function menuTree(data?: any) {
  return request('/api/sys/menu/tree', {
    method: 'POST',
    data
  });
}
/* 获取单个角色 权限树 */
export async function findTree(data?: any) {
  return request('/api/sys/role/findTree', {
    method: 'POST',
    data
  });
}

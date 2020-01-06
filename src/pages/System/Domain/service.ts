import request from '@/utils/request';

export async function fakeSubmitForm(params: any) {
  return request('/api/config/domain/commit', {
    method: 'POST',
    data: params,
  });
}

export async function getConfig(params: any) {
  return request('/api/config/domain/find', {
    method: 'POST',
    data: params,
  });
}

import request from '@/utils/request';

export async function fakeSubmitForm(params: any) {
  return request('/api/config/share/commit', {
    method: 'POST',
    data: params,
  });
}

export async function getConfig(params: any) {
  return request('/api/config/share/find', {
    method: 'POST',
    data: params,
  });
}

import request from '@/utils/request';

export async function fakeSubmitForm(params: any) {
  return request('/api/config/app/commit', {
    method: 'POST',
    data: params,
  });
}

export async function getConfig(params: any) {
  return request('/api/config/app/find', {
    method: 'POST',
    data: params,
  });
}

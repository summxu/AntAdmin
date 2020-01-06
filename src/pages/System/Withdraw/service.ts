import request from '@/utils/request';

export async function fakeSubmitForm(params: any) {
  return request('/api/config/withdraw/commit', {
    method: 'POST',
    data: params,
  });
}

export async function getConfig(params: any) {
  return request('/api/config/withdraw/find', {
    method: 'POST',
    data: params,
  });
}

import request from '@/utils/request';

export async function fakeSubmitForm(params: any) {
  return request('/api/config/pay/commit', {
    method: 'POST',
    data: params,
  });
}

export async function getConfig(params: any) {
  return request('/api/config/pay/find', {
    method: 'POST',
    data: params,
  });
}

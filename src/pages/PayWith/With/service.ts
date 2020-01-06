/*
 * @Auth: Chenxu
 * @Date: 2019-12-23 10:15:56
 * @LastEditTime : 2019-12-23 13:29:48
 */
import request from '@/utils/request';

/* 请求列表 */
export async function queryRule(data: any) {
  return request('/api/withdraw/list', {
    method: 'POST',
    data
  });
}
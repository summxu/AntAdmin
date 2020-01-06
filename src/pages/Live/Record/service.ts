/*
 * @Auth: Chenxu
 * @Date: 2019-12-23 10:15:56
 * @LastEditTime : 2019-12-23 14:53:55
 */
import request from '@/utils/request';

/* 请求列表 */
export async function queryRule(data: any) {
  return request('/api/live/record/list', {
    method: 'POST',
    data
  });
}
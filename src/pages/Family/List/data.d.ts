/*
 * @Auth: Chenxu
 * @Date: 2019-12-22 11:20:09
 * @LastEditTime : 2019-12-22 13:24:54
 */
export interface TableListItem {
  id: number;
  memberId: number;

  badgePath: string;
  content: string;
  idCardOne: string;
  idCardTwo: string;
  message: string;
  name: string;
  nickname: string;
  status: number;
  percentage: number;

  createTime: Date;
  updateTime: Date;
}

export interface TableListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface TableListData {
  list: TableListItem[];
  pagination: Partial<TableListPagination>;
}

/* 这个接口定义是错的，谁会去改接口？？ */
export interface TableListParams {
  sorter?: string;
  status?: string;
  name?: string;
  desc?: string;
  key?: number;
  pageSize?: number;
  current?: number;
}

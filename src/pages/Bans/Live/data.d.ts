/*
 * @Auth: Chenxu
 * @Date: 2019-12-23 15:23:20
 * @LastEditTime : 2019-12-23 16:04:59
 */
export interface TableListItem {
  id: number;
  anchorId: number;
  memberId: number;

  anchorName: string;
  endTime: string;
  dayCount: number;
  memberName: string;
  nickname: string;
  status: number;

  createTime: Date;
  updateTime: Date;
  createBy: string;
  updateBy: string;
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
  mobile: string;
  name: string;
  nickname: string;
  status: number;

  pageSize?: number;
  current?: number;
  endTime?: Date;
  startTime?: Date;
}

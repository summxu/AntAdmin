/*
 * @Auth: Chenxu
 * @Date: 2019-12-16 13:25:00
 * @LastEditTime : 2019-12-23 14:54:27
 */
export interface TableListItem {
  id: number;
  anchorId: number;

  endTime: string;
  flow: string;
  nickname: string;
  num: number;
  roomId: number;
  startTime: number;

  updateBy: string;
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

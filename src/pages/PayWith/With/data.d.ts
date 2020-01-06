/*
 * @Auth: Chenxu
 * @Date: 2019-12-16 13:25:00
 * @LastEditTime : 2019-12-23 13:29:37
 */
export interface TableListItem {
  id: number;
  anchorId: number;

  account: string;
  name: string;
  nickname: string;
  virtualTicket: number;
  status: number;
  money: number;

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

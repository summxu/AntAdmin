/*
 * @Auth: Chenxu
 * @Date: 2019-12-16 13:25:00
 * @LastEditTime: 2019-12-18 16:01:49
 */
export interface TableListItem {
  id: number;

  channel: number;
  memberId: number;
  money: number;
  outNum: number;
  num: number;
  status: number;
  type: number;
  virtualCurrency: number;
  giveVirtualCurrency: number;
  virtualCurrency: number;
  nickname: string;

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

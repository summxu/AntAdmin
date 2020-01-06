/*
 * @Auth: Chenxu
 * @Date: 2019-12-16 13:25:00
 * @LastEditTime: 2019-12-18 15:46:16
 */
export interface TableListItem {
  id: number;
  name: string;

  giveVirtualCurrency: number;
  money: number;
  order: number;
  status: number;
  virtualCurrency: number;
  name: string;

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

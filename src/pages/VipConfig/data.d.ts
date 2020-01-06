/*
 * @Auth: Chenxu
 * @Date: 2019-12-16 13:25:00
 * @LastEditTime: 2019-12-18 14:56:25
 */
export interface TableListItem {
  id: number;
  name: string;

  month: number;
  order: number;
  virtualCurrency: number;

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

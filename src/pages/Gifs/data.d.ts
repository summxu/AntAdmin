/*
 * @Auth: Chenxu
 * @Date: 2019-12-16 13:25:00
 * @LastEditTime : 2019-12-23 15:04:15
 */
export interface TableListItem {
  id: number;
  imgPath: string;

  gifPath: string;
  time: string;
  status: number;
  gitType: number;
  tag: number;
  type: number;
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

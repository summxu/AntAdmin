/*
 * @Auth: Chenxu
 * @Date: 2019-12-16 13:25:00
 * @LastEditTime: 2019-12-19 10:34:49
 */
export interface TableListItem {
  id: number;

  mobile: string;
  nickname: string;
  password: string;
  salt: string;
  status: number;
  username: string;

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

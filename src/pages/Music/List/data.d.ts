/*
 * @Auth: Chenxu
 * @Date: 2019-12-16 13:25:00
 * @LastEditTime : 2019-12-24 10:50:44
 */
export interface TableListItem {
  id: number;

  count: number;
  filePath: string;
  imgPath: string;
  name: string;
  person: string;
  status: number;
  typeId: number;

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

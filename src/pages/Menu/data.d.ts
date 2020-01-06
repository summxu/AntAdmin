/*
 * @Auth: Chenxu
 * @Date: 2019-12-16 13:25:00
 * @LastEditTime: 2019-12-17 13:49:01
 */
export interface TableListItem {
  id: number;
  name: string;

  icon: string;
  orderNum: number;
  parentId: number;
  perms: string;
  type: number;
  typeStr: string;

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

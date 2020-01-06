export interface TableListItem {
  id: number;
  createBy: string;
  updateBy: string;
  desc: string;
  callNo: number;
  status: number;
  imgPath: string;
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

/* 这个接口定义是错的，谁会去改接口？？ */
export interface TableListParams {
  sorter?: string;
  status?: string;
  name?: string;
  desc?: string;
  key?: number;
  pageSize?: number;
  current?: number;
}

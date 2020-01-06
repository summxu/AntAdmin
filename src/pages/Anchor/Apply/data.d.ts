export interface TableListItem {
  id: number;
  memberId: number;
  message: string;
  mobile: string;
  name: string;
  nickname: string;
  status: number;
  idCard: string;
  idCardOne: string;
  idCardTwo: string;
  idCardThree: string;

  createTime: Date;
  updateTime: Date;
  createBy: string;
  updateBy: string;
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
  mobile: string;
  name: string;
  nickname: string;
  status: number;

  pageSize?: number;
  current?: number;
  endTime?: Date;
  startTime?: Date;
}

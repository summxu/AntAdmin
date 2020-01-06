/*
 * @Auth: Chenxu
 * @Date: 2019-12-18 11:50:53
 * @LastEditTime: 2019-12-18 13:44:40
 */
export interface TableListItem {
  id: number;

  memberId: number;
  memberName: string;
  status: string;
  reportMemberId: string;
  reportMemberName: string;
  typeId: number;
  typeName: string;
  content: string;

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

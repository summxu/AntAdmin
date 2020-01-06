/*
 * @Auth: Chenxu
 * @Date: 2019-12-16 13:25:00
 * @LastEditTime : 2019-12-23 14:24:46
 */
export interface TableListItem {
  id: number;
  anchorId: number;
  nickname: string;

  count: number;
  entTime: number;
  favour: number;
  liveType: number;
  noticeTime: number;
  status: number;
  num: number;
  profit: number;
  videoType: number;
  virtualCurrency: number;
  type: number;
  pullFlowPath: string;
  typeName: string;

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

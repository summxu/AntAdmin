/*
 * @Auth: Chenxu
 * @Date: 2019-12-16 13:25:00
 * @LastEditTime : 2019-12-20 16:45:08
 */
export interface TableListItem {
  id: number;
  familyId: number;
  retailId: number;
  sex: number;
  status: number;
  type: number;

  balance: number;
  channel: number;
  endLoginTime: string;
  exp: string;
  status: number;
  imgPath: string;
  level: string;
  loginIp: string;
  mobile: string;
  nickname: string;
  shareCode: string;
  virtualCurrency: string;
  totalTicket: string;
  totalVirtualCurrency: string;
  virtualTicket: string;
  vipEndTime: string;

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

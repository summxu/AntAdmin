import { Button, Input, InputNumber, Modal, Form, message } from 'antd';
import React, { useState } from 'react';

import { FormComponentProps } from 'antd/es/form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, UseFetchDataAction } from '@ant-design/pro-table';

import { TableListItem } from './data.d';
import { queryRule } from './service';
import 'antd/dist/antd.less';

interface TableListProps extends FormComponentProps { }

const handleExport = async (data: any) => {
  window.open('/api/withdraw/check/file')
}

const TableList: React.FC<TableListProps> = () => {

  const columns: ProColumns<TableListItem>[] = [
    {
      title: '流名',
      dataIndex: 'flow',
      hideInSearch: true
    }, {
      title: '主播昵称',
      dataIndex: 'nickname',
      hideInSearch: true
    }, {
      title: '直播间编号',
      dataIndex: 'num',
      hideInSearch: true
    }, {
      title: '收益',
      dataIndex: 'profit',
      hideInSearch: true
    }, {
      title: '直播开始时间',
      dataIndex: 'startTime',
      hideInSearch: true
    }
  ];

  return (
    <PageHeaderWrapper>
      <ProTable<TableListItem>
        headerTitle="查询表格"
        rowKey="id"
        search={false}
        rowSelection={{
          type: "checkbox"
        }}
        request={params => queryRule(params).catch(err => { console.log(err) })}
        filterDate={(data: any): any[] => {
          return data.list
        }}
        columns={columns}
      />

    </PageHeaderWrapper>
  );
};

export default Form.create<TableListProps>()(TableList);

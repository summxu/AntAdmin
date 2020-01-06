import { Badge, Button, Divider, Avatar, Form, message, Modal, Input } from 'antd';
import React, { useState } from 'react';

import { FormComponentProps } from 'antd/es/form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, UseFetchDataAction } from '@ant-design/pro-table';
import { TableListItem } from './data.d';

import { queryRule, cancel_sign } from './service';
import 'antd/dist/antd.less';

const { TextArea } = Input

interface TableListProps extends FormComponentProps { }

const status = ['失效', '有效'];
const type = ['短期禁言', '永久禁言'];
const statusMap = ['error', 'success'];

const TableList: React.FC<TableListProps> = () => {

  const columns: ProColumns<TableListItem>[] = [
    {
      title: '被踢用户ID',
      dataIndex: 'memberId',
    }, {
      title: '被踢用户昵称',
      dataIndex: 'memberNickname',
    }, {
      title: '主播昵称',
      dataIndex: 'nickname',
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
        request={(params: any) => queryRule(params).catch(err => { console.log(err) })}
        filterDate={(data: any): any[] => {
          return data.list
        }}
        columns={columns}
      />
    </PageHeaderWrapper>
  );
};

export default Form.create<TableListProps>()(TableList);

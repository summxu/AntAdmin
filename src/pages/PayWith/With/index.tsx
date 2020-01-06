import { Button, Input, InputNumber, Modal, Form, message } from 'antd';
import React, { useState } from 'react';

import { FormComponentProps } from 'antd/es/form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, UseFetchDataAction } from '@ant-design/pro-table';

import { TableListItem } from './data.d';
import { queryRule } from './service';
import 'antd/dist/antd.less';

const status = ['待审核', '提现成功', '审核失败', '提现失败'];

interface TableListProps extends FormComponentProps { }

const handleExport = async (data: any) => {
  window.open('/api/withdraw/check/file')
}

const TableList: React.FC<TableListProps> = () => {

  const columns: ProColumns<TableListItem>[] = [
    {
      title: '提现人姓名',
      dataIndex: 'name',
      hideInSearch: true
    }, {
      title: '会员昵称',
      dataIndex: 'nickname',
      hideInSearch: true
    }, {
      title: '虚拟票',
      dataIndex: 'virtualTicket',
      hideInSearch: true
    }, {
      title: '提现账户',
      dataIndex: 'account',
      hideInSearch: true
    }, {
      title: '提现金额',
      dataIndex: 'money',
      hideInSearch: true
    }, {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      ellipsis: true,
      valueEnum: {
        1: status[0],
        2: status[1],
        3: status[2],
        4: status[3],
      },
      filters: [
        {
          text: status[0],
          value: '1',
        }, {
          text: status[1],
          value: '2',
        }, {
          text: status[2],
          value: '3',
        }, {
          text: status[3],
          value: '4'
        }
      ],
      onFilter: (value, record) => record.status == value,
      render(text, row) {
        return <span >{text}</span>
      }
    }
  ];

  return (
    <PageHeaderWrapper>
      <ProTable<TableListItem>
        headerTitle="查询表格"
        rowKey="id"
        rowSelection={{
          type: "checkbox"
        }}
        renderToolBar={(action, { selectedRows }) => [
          <Button type="primary" onClick={e => {
            handleExport(selectedRows)
          }}>导出</Button>,
        ]}
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

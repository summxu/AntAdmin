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

/* 签约、取消签约 */
const signOption = async (record: TableListItem, action: UseFetchDataAction<any>) => {
  const hide = message.loading('正在执行');
  try {
    var params: any = {
      id: record.id
    }
    var res = await cancel_sign(params)
    hide()
    message.success(res.message)
    action.reload()
  } catch (error) {
    hide()
    console.log(error);
  }
}

const status = ['失效', '有效'];
const statusMap = ['error', 'success'];

const TableList: React.FC<TableListProps> = () => {

  const columns: ProColumns<TableListItem>[] = [
    {
      title: '主播名称',
      dataIndex: 'anchorName',
    }, {
      title: '超管名称',
      hideInSearch: true,
      dataIndex: 'memberName'
    }, {
      title: '主播昵称',
      dataIndex: 'nickname',
      hideInSearch: true
    }, {
      title: '禁播天数',
      dataIndex: 'dayCount',
      hideInSearch: true
    }, {
      title: '禁播结束时间',
      dataIndex: 'endTime',
      hideInSearch: true
    }, {
      title: '状态',
      dataIndex: 'status',
      hideInSearch: true,
      key: 'status',
      valueEnum: {
        0: status[0],
        1: status[1]
      },
      filters: [
        {
          text: status[0],
          value: '0',
        }, {
          text: status[1],
          value: '1',
        }
      ],
      onFilter: (value, record) => record.status == value,
      render(text, row) {
        return <Badge status={statusMap[row.status] as 'success'} text={text} />;
      }
    }, {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record, index, action) => (
        <>
          <a
            className="chenxu-danger"
            onClick={async e => {
              e.preventDefault()
              signOption(record, action)
            }} >取消禁播</a>
        </>
      ),
    },
  ];

  return (
    <PageHeaderWrapper>
      <ProTable<TableListItem>
        headerTitle="查询表格"
        rowKey="id"
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

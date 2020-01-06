import { Badge, Button, Divider, Avatar, Form, message, Modal, Input } from 'antd';
import React, { useState } from 'react';

import { FormComponentProps } from 'antd/es/form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, UseFetchDataAction } from '@ant-design/pro-table';
import { TableListItem } from './data.d';

import { queryRule, cancel_sign, sign, over } from './service';
import 'antd/dist/antd.less';

const { TextArea } = Input

interface TableListProps extends FormComponentProps { }

/* 签约、取消签约 */
const signOption = async (type: string, record: TableListItem, action: UseFetchDataAction<any>) => {
  const hide = message.loading('正在执行');
  try {
    var params: any = {
      id: record.id
    }
    if (type == 'cancel_sign') {
      var res = await cancel_sign(params)
    } else if (type == 'sign') {
      var res = await sign(params)
    } else {
      var res = await over(params)
    }
    hide()
    message.success(res.message)
    action.reload()
  } catch (error) {
    hide()
    console.log(error);
  }
}

const status = ['待处理', '已处理'];
const statusMap = ['', 'error', 'success'];

const TableList: React.FC<TableListProps> = () => {

  const columns: ProColumns<TableListItem>[] = [
    {
      title: '举报人',
      dataIndex: 'memberName',
      hideInSearch: true
    }, {
      title: '被举报人',
      dataIndex: 'reportMemberName',
      hideInSearch: true
    }, {
      title: '举报内容',
      dataIndex: 'content',
      width: '200px',
      ellipsis: true,
      hideInSearch: true
    }, {
      title: '类型名称',
      dataIndex: 'typeName',
      hideInSearch: true
    }, {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      ellipsis: true,
      filters: [
        {
          text: status[0],
          value: '1',
        }, {
          text: status[1],
          value: '2',
        }
      ],
      valueEnum: {
        1: status[0],
        2: status[1]
      },
      render(text, row) {
        return <Badge status={statusMap[row.status] as 'success'} text={text} />;
      },
      onFilter: (value, record) => record.status == value,
    }, {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record, index, action) => (
        <>
          {(
            <>
              <a className="chenxu-danger" onClick={async e => {
                e.preventDefault()
                signOption('cancel_sign', record, action)
              }} >禁用用户</a>

              <Divider type="vertical" />
              <a onClick={async e => {
                e.preventDefault()
                signOption('sign', record, action)
              }} >启用用户</a>

              <Divider type="vertical" />
              <a className="chenxu-success" onClick={async e => {
                e.preventDefault()
                signOption('over', record, action)
              }} >处理完成</a>
            </>
          )}
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
        renderToolBar={(action, { selectedRows }) => [
          selectedRows && selectedRows.length > 0 && (
            <Button.Group >
              <Button
                onClick={async e => {
                  selectedRows.forEach(item => {
                    signOption('sign', item, action)
                  });
                }}>批量启用</Button>
              <Button
                onClick={async e => {
                  selectedRows.forEach(item => {
                    signOption('cancel_sign', item, action)
                  });
                }}>批量禁用</Button>
            </Button.Group>
          ),
        ]}
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

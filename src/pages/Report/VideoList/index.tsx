import { Badge, Button, Divider, Avatar, Form, message, Modal, Input } from 'antd';
import React, { useState } from 'react';

import { FormComponentProps } from 'antd/es/form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, UseFetchDataAction } from '@ant-design/pro-table';
import { TableListItem } from './data.d';

import { queryRule, cancel_sign, over } from './service';
import 'antd/dist/antd.less';


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

const status = ['待处理', '已删除', '已处理'];
const statusMap = ['processing', 'error', 'success'];

const TableList: React.FC<TableListProps> = () => {

  const columns: ProColumns<TableListItem>[] = [
    {
      title: '举报人',
      dataIndex: 'nickname',
      hideInSearch: true
    }, {
      title: '被举报人',
      dataIndex: 'reportNickname',
      hideInSearch: true
    }, {
      title: '举报类型名称',
      dataIndex: 'typeName',
      hideInSearch: true
    }, {
      title: '描述',
      dataIndex: 'message',
      hideInSearch: true,
      width: "200px",
      ellipsis: true
    }, {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      filters: [
        {
          text: status[0],
          value: '0',
        }, {
          text: status[1],
          value: '1',
        }, {
          text: status[2],
          value: '2',
        }
      ],
      valueEnum: {
        0: status[0],
        1: status[1],
        2: status[2]
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
              }} >下架视频</a>

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
                    signOption('cancel_sign', item, action)
                  });
                }}>批量下架</Button>
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

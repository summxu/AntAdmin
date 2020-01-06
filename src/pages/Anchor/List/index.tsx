import { Badge, Button, Divider, Avatar, Form, message } from 'antd';
import React from 'react';

import { FormComponentProps } from 'antd/es/form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, UseFetchDataAction } from '@ant-design/pro-table';
import { TableListItem } from './data.d';

import { queryRule, cancel_sign, sign } from './service';
import 'antd/dist/antd.less';

interface TableListProps extends FormComponentProps { }

/* 签约、取消签约 */
const signOption = async (type: string, record: TableListItem, action: UseFetchDataAction<any>) => {
  const hide = message.loading('正在执行');
  try {
    var params = {
      id: record.id
    }
    if (type == 'cancel_sign') {
      var res = await cancel_sign(params)
    } else {
      var res = await sign(params)
    }
    hide()
    message.success(res.message)
    action.reload()
  } catch (error) {
    hide()
    console.log(error);
  }
}

const TableList: React.FC<TableListProps> = () => {

  const columns: ProColumns<TableListItem>[] = [
    {
      title: '姓名',
      dataIndex: 'name'
    }, {
      title: '手机号',
      dataIndex: 'mobile'
    }, {
      title: '昵称',
      dataIndex: 'nickname',
      hideInSearch: true
    }, {
      title: '身份证',
      dataIndex: 'idCard',
      hideInSearch: true
    }, {
      title: '形象照片',
      dataIndex: 'imgPath',
      hideInSearch: true,
      align: 'center',
      render: (_, row) => {
        return <Avatar
          style={{ verticalAlign: 'middle' }}
          shape="square"
          size="large"
          srcSet={row.imgPath}
        >
        </Avatar>
      }
    }, {
      title: '当前经验',
      dataIndex: 'exp',
      hideInSearch: true
    }, {
      title: '主播等级',
      dataIndex: 'level',
      hideInSearch: true
    }, {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      ellipsis: true,
      valueEnum: {
        1: '已签约',
        2: '未签约'
      },
      filters: [
        {
          text: '未签约',
          value: '2',
        },
        {
          text: '已签约',
          value: '1',
        }
      ],
      onFilter: (value, record) => record.status == value,
      render(text, row) {
        const value = row.status
        return <Badge status={
          value === 1 ? 'success' : 'default'
        }
          text={
            value === 1 ? '已签约' : '未签约'
          } />;
      },
    }, {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record, index, action) => (
        <>
          {record.status === 1 ? (
            <>
              <a className="chenxu-danger" onClick={async e => {
                e.preventDefault()
                signOption('cancel_sign', record, action)
              }} >取消签约</a>
            </>
          ) : (<>
            <Divider type="vertical" />
            <a onClick={async e => {
              e.preventDefault()
              signOption('sign', record, action)
            }} >签约</a>
          </>)}
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
                }}>批量签约</Button>
              <Button
                onClick={async e => {
                  selectedRows.forEach(item => {
                    signOption('cancel_sign', item, action)
                  });
                }}>批量取消签约</Button>
            </Button.Group>
          ),
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

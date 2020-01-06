import { Button, Divider, Form, message, Badge } from 'antd';
import React, { useState } from 'react';

import { FormComponentProps } from 'antd/es/form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, UseFetchDataAction } from '@ant-design/pro-table';

import { TableListItem } from './data.d';
import { queryRule, exportExcel } from './service';
import 'antd/dist/antd.less';

interface TableListProps extends FormComponentProps { }

const status = ['未支付', '已支付'];
const statusMap = ['', 'error', 'success']
const type = ['支付宝', '微信']
const channel = ['PC', 'IOS', 'Android']
const handleExport = async (data: any) => {
  window.open('/api/recharge/check/file')
}

const TableList: React.FC<TableListProps> = () => {

  const columns: ProColumns<TableListItem>[] = [
    {
      title: '会员昵称',
      dataIndex: 'nickname',
      hideInSearch: true
    }, {
      title: '订单号',
      dataIndex: 'num',
      hideInSearch: true
    }, {
      title: '充值金额',
      dataIndex: 'money',
      hideInSearch: true
    }, {
      title: '第三方流水号',
      dataIndex: 'outNum',
      hideInSearch: true
    }, {
      title: '兑换虚拟币',
      dataIndex: 'virtualCurrency',
      hideInSearch: true
    }, {
      title: '渠道',
      dataIndex: 'channel',
      hideInSearch: true,
      key: 'channel',
      valueEnum: {
        1: channel[0],
        2: channel[1],
        3: channel[3]
      },
      filters: [
        {
          text: channel[0],
          value: '1',
        }, {
          text: channel[1],
          value: '2',
        }, {
          text: channel[2],
          value: '3',
        }
      ],
      onFilter: (value, record) => record.channel == value,
      render(text, row) {
        return <span>{text}</span>
      }
    }, {
      title: '支付类型',
      dataIndex: 'type',
      hideInSearch: true,
      key: 'type',
      valueEnum: {
        1: type[0],
        2: type[1]
      },
      filters: [
        {
          text: type[0],
          value: '1',
        }, {
          text: type[1],
          value: '2',
        }
      ],
      onFilter: (value, record) => record.type == value,
      render(text, row) {
        return <span>{text}</span>
      }
    }, {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      valueEnum: {
        1: status[0],
        2: status[1]
      },
      filters: [
        {
          text: status[0],
          value: '1',
        }, {
          text: status[1],
          value: '2',
        }
      ],
      onFilter: (value, record) => record.status == value,
      render(text, row) {
        return <Badge status={statusMap[row.status] as 'success'} text={text} />;
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

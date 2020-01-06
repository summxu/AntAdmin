import { Button, Input, InputNumber, Modal, Form, message } from 'antd';
import React, { useState } from 'react';

import { FormComponentProps } from 'antd/es/form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, UseFetchDataAction } from '@ant-design/pro-table';

import { TableListItem } from './data.d';
import { queryRule, commit } from './service';
import 'antd/dist/antd.less';

interface TableListProps extends FormComponentProps { }

const handleExport = async (data: any) => {
  window.open('/api/recharge/manual/check/file')
}

const TableList: React.FC<TableListProps> = () => {

  const [visible, setVisible] = useState(false)
  const [rejectMsg, setRejectMsg] = useState<number>(0)
  const [record, setRecord] = useState<any>({})
  const [action, setAction] = useState<any>({})

  /* 处理增加修改接口 */
  const handleOption = async (params: any) => {
    const hide = message.loading('正在执行');
    try {
      var res = await commit(params)
      hide();
      message.success(res.message)
    } catch (error) {
      hide();
      console.log(error);
    }
  }

  const columns: ProColumns<TableListItem>[] = [
    {
      title: 'ID',
      dataIndex: 'id'
    }, {
      title: '会员昵称',
      dataIndex: 'nickname',
    }, {
      title: '充值虚拟币',
      dataIndex: 'virtualCurrency',
      hideInSearch: true
    }, {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record, index, action) => (
        <>
          <a
            className="chenxu-danger"
            onClick={() => {
              setVisible(true)
            }}
          >手动充值</a>
        </>
      ),
    },
  ];

  return (
    <PageHeaderWrapper>

      {/* model */}
      <Modal
        title="充值金额"
        visible={visible}
        onOk={() => {
          setVisible(false)
          /* 发送拒绝接口 */
          record.message = rejectMsg
          handleOption(record)
        }}
        onCancel={() => setVisible(false)}
      >
        <InputNumber onChange={(value) => {
          setRejectMsg(value!)
        }} placeholder="请输入充值金额"></InputNumber>
      </Modal>

      <ProTable<TableListItem>
        headerTitle="查询表格"
        onInit={setAction}
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

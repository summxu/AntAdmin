import { Form, message, Modal, Input } from 'antd';
import React, { useState } from 'react';

import { FormComponentProps } from 'antd/es/form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { TableListItem } from './data.d';

import { queryRule, cancel_sign, sign } from './service';
import 'antd/dist/antd.less';

const { TextArea } = Input

interface TableListProps extends FormComponentProps { }

/* 签约、取消签约 */
const signOption = async (type: string, record: TableListItem, action: ActionType) => {
  const hide = message.loading('正在执行');
  try {
    var params: any = {
      id: record.id
    }
    if (type == 'cancel_sign') {
      params.message = record.message
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

  const [visible, setVisible] = useState(false)
  const [rejectMsg, setRejectMsg] = useState('')
  const [record, setRecord] = useState<any>({})
  const [action, setAction] = useState<any>({})

  const columns: ProColumns<TableListItem>[] = [
    {
      title: '家族名称',
      dataIndex: 'familyName',
    }, {
      title: '用户昵称',
      dataIndex: 'nickname'
    }, {
      title: '抽成',
      dataIndex: 'percentage',
      hideInSearch: true
    }, {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record, index, action) => (
        <>
          <a onClick={async e => {
            e.preventDefault()
            setVisible(true)
          }} >提现记录</a>
        </>
      ),
    },
  ];

  return (
    <PageHeaderWrapper>

      {/* model */}
      <Modal
        title="拒绝理由"
        visible={visible}
        onOk={() => {
          setVisible(false)
          /* 发送拒绝接口 */
          record.message = rejectMsg
          signOption('cancel_sign', record, action)
        }}
        onCancel={() => setVisible(false)}
      >
        <TextArea onChange={(e) => {
          setRejectMsg(e.currentTarget.value)
        }} placeholder="请输入拒绝理由"></TextArea>
      </Modal>

      <ProTable<TableListItem>
        headerTitle="查询表格"
        rowKey="id"
        rowSelection={{
          type: "checkbox"
        }}
        request={params => queryRule(params).then(res => {
          return {
            data: res.data.list,
            success: true,
            total: res.data.total
          };
        }).catch(error => {
          console.log(error);
          return Promise.reject(error)
        })}
        columns={columns}
      />
    </PageHeaderWrapper>
  );
};

export default Form.create<TableListProps>()(TableList);

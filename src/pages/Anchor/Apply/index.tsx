import { Badge, Button, Divider, Avatar, Form, message, Modal, Input } from 'antd';
import React, { useState } from 'react';

import { FormComponentProps } from 'antd/es/form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, UseFetchDataAction } from '@ant-design/pro-table';
import { TableListItem } from './data.d';

import { queryRule, cancel_sign, sign } from './service';
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

const status = ['审核中', '已通过', '被拒绝'];
const statusMap = ['processing', 'success', 'error'];

const TableList: React.FC<TableListProps> = () => {

  const [visible, setVisible] = useState(false)
  const [rejectMsg, setRejectMsg] = useState('')
  const [record, setRecord] = useState<any>({})
  const [action, setAction] = useState<any>({})

  const columns: ProColumns<TableListItem>[] = [
    {
      title: '姓名',
      dataIndex: 'name'
    }, {
      title: '手机号',
      dataIndex: 'mobile'
    }, {
      title: '昵称',
      dataIndex: 'nickname'
    }, {
      title: '身份证',
      dataIndex: 'idCard',
      hideInSearch: true
    }, {
      title: '身份证照片(正面)',
      dataIndex: 'idCardOne',
      hideInSearch: true,
      align: 'center',
      render: (_, row) => {
        return <Avatar
          style={{ verticalAlign: 'middle' }}
          shape="square"
          size="large"
          srcSet={row.idCardOne}
        >
        </Avatar>
      }
    }, {
      title: '身份证照片(反面)',
      dataIndex: 'idCardTwo',
      hideInSearch: true,
      align: 'center',
      render: (_, row) => {
        return <Avatar
          style={{ verticalAlign: 'middle' }}
          shape="square"
          size="large"
          srcSet={row.idCardTwo}
        >
        </Avatar>
      }
    }, {
      title: '身份证照片(手持)',
      dataIndex: 'idCardThree',
      hideInSearch: true,
      align: 'center',
      render: (_, row) => {
        return <Avatar
          style={{ verticalAlign: 'middle' }}
          shape="square"
          size="large"
          srcSet={row.idCardThree}
        >
        </Avatar>
      }
    }, {
      title: '拒绝理由',
      dataIndex: 'message',
      hideInSearch: true,
      ellipsis: true,
      width: '200px'
    }, {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      ellipsis: true,
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
                setRecord(record)
                setAction(action)
                setVisible(true)
              }} >拒绝</a>

              <Divider type="vertical" />
              <a onClick={async e => {
                e.preventDefault()
                signOption('sign', record, action)
              }} >通过</a>
            </>
          )}
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
        renderToolBar={(action, { selectedRows }) => [
          selectedRows && selectedRows.length > 0 && (
            <Button.Group >
              <Button
                onClick={async e => {
                  selectedRows.forEach(item => {
                    signOption('sign', item, action)
                  });
                }}>批量通过</Button>
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

import { Badge, Button, Divider, Avatar, Form, message, Modal, Input } from 'antd';
import React, { useState, useRef } from 'react';
import CreateForm from './components/CreateForm';
import { FormComponentProps } from 'antd/es/form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import { TableListItem } from './data.d';

import { queryRule, cancel_sign, sign, commit } from './service';
import 'antd/dist/antd.less';

const { TextArea } = Input

interface TableListProps extends FormComponentProps { }

const status = ['未审核', '审核成功', '审核失败', '删除'];


/* 签约、取消签约 */
const signOption = async (type: string, record: TableListItem, action: ActionType) => {
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

  const [visible, setVisible] = useState(false)
  const [rejectMsg, setRejectMsg] = useState('')
  const [record, setRecord] = useState<any>({})
  const [action, setAction] = useState<any>({})
  const [windowObj, setWindowObj] = useState<any>({});
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();

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
      title: '家族名称',
      dataIndex: 'name'
    }, {
      title: '族长昵称',
      dataIndex: 'nickname'
    }, {
      title: '家族简介',
      dataIndex: 'content',
      hideInSearch: true,
      width: '300px',
      ellipsis: true
    }, {
      title: '徽章图标',
      dataIndex: 'badgePath',
      hideInSearch: true,
      align: 'center',
      render: (_, row) => {
        return <Avatar
          style={{ verticalAlign: 'middle' }}
          shape="square"
          size="large"
          srcSet={row.badgePath}
        >
        </Avatar>
      }
    }, {
      title: '族长身份证照片正面',
      dataIndex: 'idCardOne',
      hideInSearch: true,
      align: 'center',
      render: (_, row) => {
        return <Avatar
          style={{ verticalAlign: 'middle' }}
          shape="square"
          size="large"
          srcSet={row.badgePath}
        >
        </Avatar>
      }
    }, {
      title: '族长身份证照片反面',
      dataIndex: 'idCardTwo',
      hideInSearch: true,
      align: 'center',
      render: (_, row) => {
        return <Avatar
          style={{ verticalAlign: 'middle' }}
          shape="square"
          size="large"
          srcSet={row.badgePath}
        >
        </Avatar>
      }
    }, {
      title: '审核失败原因',
      dataIndex: 'exp',
      hideInSearch: true,
      width: '300px',
      ellipsis: true
    }, {
      title: '抽成',
      dataIndex: 'percentage',
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
          value: '4',
        }
      ],
      onFilter: (value, record) => record.status == value,
      render(text, row) {
        return <span >{text}</span>
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
                setRecord(record)
                setAction(action)
                setVisible(true)
              }} >拒绝审核</a>
            </>
          ) : (<>
            <Divider type="vertical" />
            <a onClick={async e => {
              e.preventDefault()
              signOption('sign', record, action)
            }} >通过审核</a>
          </>)}
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
        actionRef={actionRef}
        rowSelection={{
          type: "checkbox"
        }}
        toolBarRender={(action, { selectedRows }) => [
          <Button type="primary" onClick={e => {
            setWindowObj({
              type: 'create',
              title: '新建'
            })
            handleModalVisible(true)
          }}>新建</Button>,

          selectedRows && selectedRows.length > 0 && (
            <Button.Group >
              <Button
                onClick={async e => {
                  selectedRows.forEach(item => {
                    signOption('sign', item, action)
                  });
                }}>批量通过</Button>
              <Button
                onClick={async e => {
                  selectedRows.forEach(item => {
                    signOption('cancel_sign', item, action)
                  });
                }}>批量拒绝</Button>
            </Button.Group>
          ),
        ]}
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

      {/* 打开窗口 */}
      <CreateForm
        onSubmit={async (value: any) => {
          await handleOption(value);
          handleModalVisible(false);
          actionRef.current!.reload();
        }}
        onCancel={() => handleModalVisible(false)}
        modalVisible={createModalVisible}
        windowObj={windowObj}
      />
    </PageHeaderWrapper>
  );
};

export default Form.create<TableListProps>()(TableList);

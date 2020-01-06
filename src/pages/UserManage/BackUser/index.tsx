import { Button, Divider, Form, message } from 'antd';
import React, { useState } from 'react';

import { FormComponentProps } from 'antd/es/form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, UseFetchDataAction } from '@ant-design/pro-table';
import CreateForm from './components/CreateForm';

import { TableListItem } from './data.d';
import { queryRule, commit, enable, disable, detail, reset } from './service';
import 'antd/dist/antd.less';

interface TableListProps extends FormComponentProps { }

const handleOption = async (type: string, record: TableListItem, action: UseFetchDataAction<any>) => {
  const hide = message.loading('正在执行');
  try {
    var params = {
      id: record.id
    }
    if (type == 'enable') {
      var res = await enable(params)
    } else {
      var res = await disable(params)
    }
    hide();
    message.success(res.message)
    action.reload()
  } catch (error) {
    hide();
    console.log(error);
  }
}

/* 重置密码 */
const handleReset = async (record: TableListItem, action: UseFetchDataAction<any>) => {
  const hide = message.loading('正在重置密码...');
  try {
    var params = {
      id: record.id
    }
    var res = await reset(params)
    hide();
    message.success('密码重置为123456')
    action.reload()
  } catch (error) {
    hide();
    console.log(error);
  }
};

const status = ['启用', '禁用'];

const TableList: React.FC<TableListProps> = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [windowObj, setWindowObj] = useState<any>({});
  const [actionRef, setActionRef] = useState<UseFetchDataAction<{ data: TableListItem[] }>>();

  /* 处理增加修改接口 */
  const handleCUR = async (params: any) => {
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
      title: '昵称',
      dataIndex: 'nickname',
    }, {
      title: '手机号',
      dataIndex: 'mobile',
      hideInSearch: true
    }, {
      title: '密码',
      dataIndex: 'password',
      hideInSearch: true
    }, {
      title: '盐',
      dataIndex: 'salt',
      hideInSearch: true
    }, {
      title: '状态',
      dataIndex: 'status',
      key: 'type',
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
          value: '2'
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
          <a
            onClick={async () => {
              /* 请求详情 */
              try {
                var res = await detail({ id: record.id })
                setWindowObj({
                  type: 'edit',
                  title: '编辑菜单',
                  data: res.data
                })
                handleModalVisible(true);
              } catch (error) {
                console.log(error);
              }
            }}
          >编辑</a>
          <Divider type="vertical" />
          <a
            onClick={() => {
              handleReset(record, action)
            }}
          >重置密码</a>
          <Divider type="vertical" />
          {record.status === 2 ? (<a
            className="chenxu-success"
            onClick={() => {
              handleOption('enable', record, action)
            }}
          >启用</a>
          ) : (<a
            className="chenxu-danger"
            onClick={() => {
              handleOption('disable', record, action)
            }}
          >禁用</a>)}
        </>
      ),
    },
  ];

  return (
    <PageHeaderWrapper>
      <ProTable<TableListItem>
        headerTitle="查询表格"
        onInit={setActionRef}
        rowKey="id"
        rowSelection={{
          type: "checkbox"
        }}
        renderToolBar={(action, { selectedRows }) => [
          <Button type="primary" onClick={e => {
            setWindowObj({
              type: 'create',
              title: '新建'
            })
            handleModalVisible(true)
          }}>新建</Button>
        ]}
        request={params => queryRule(params).catch(err => { console.log(err) })}
        filterDate={(data: any): any[] => {
          return data.list
        }}
        columns={columns}
      />
      {/* 打开窗口 */}
      <CreateForm
        onSubmit={async (value: any) => {
          await handleCUR(value);
          handleModalVisible(false);
          actionRef!.reload();
        }}
        onCancel={() => handleModalVisible(false)}
        modalVisible={createModalVisible}
        windowObj={windowObj}
      />
    </PageHeaderWrapper>
  );
};

export default Form.create<TableListProps>()(TableList);

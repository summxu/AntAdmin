import { Button, Divider, Form, message, Badge } from 'antd';
import React, { useState } from 'react';

import { FormComponentProps } from 'antd/es/form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, UseFetchDataAction } from '@ant-design/pro-table';
import CreateForm from './components/CreateForm';

import { TableListItem } from './data.d';
import { queryRule, commit, detail } from './service';
import 'antd/dist/antd.less';

interface TableListProps extends FormComponentProps { }

const TableList: React.FC<TableListProps> = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [windowObj, setWindowObj] = useState<any>({});
  const [actionRef, setActionRef] = useState<UseFetchDataAction<{ data: TableListItem[] }>>();

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
      title: '时长',
      dataIndex: 'month'
    }, {
      title: '虚拟币',
      dataIndex: 'virtualCurrency'
    }, {
      title: '排序',
      dataIndex: 'order'
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
        </>
      ),
    },
  ];

  return (
    <PageHeaderWrapper>
      <ProTable<TableListItem>
        headerTitle="查询表格"
        search={false}
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
          }}>新建</Button>,
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
          await handleOption(value);
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

import { Button, Divider, Form, message } from 'antd';
import React, { useState } from 'react';

import { FormComponentProps } from 'antd/es/form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, UseFetchDataAction } from '@ant-design/pro-table';
import CreateForm from './components/CreateForm';

import { TableListItem } from './data.d';
import { queryRule, remove, add, edit, detail } from './service';
import 'antd/dist/antd.less';

interface TableListProps extends FormComponentProps { }

/**
 *  删除节点
 * @param selectedRows
 */
const handleRemove = async (record: TableListItem, action: UseFetchDataAction<any>) => {
  const hide = message.loading('正在删除...');
  try {
    var params = {
      id: record.id
    }
    var res = await remove(params)
    hide();
    message.success(res.message)
    action.reload()
  } catch (error) {
    hide();
    console.log(error);
  }
};

const status = ['菜单', '功能'];

const TableList: React.FC<TableListProps> = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [windowObj, setWindowObj] = useState<any>({});
  const [actionRef, setActionRef] = useState<UseFetchDataAction<{ data: TableListItem[] }>>();

  /* 处理增加修改接口 */
  const handleOption = async (params: any) => {
    const hide = message.loading('正在执行');
    try {
      if (windowObj.type === 'create') {
        var res = await add(params)
      } else {
        var res = await edit(params)
      }
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
      dataIndex: 'id',
      hideInSearch: true
    }, {
      title: '菜单名称',
      dataIndex: 'name',
    }, {
      title: 'icon',
      dataIndex: 'icon',
      hideInSearch: true
    }, {
      title: '菜单URL',
      dataIndex: 'url',
      hideInSearch: true
    }, {
      title: '父级ID',
      dataIndex: 'parentId',
      hideInSearch: true
    }, {
      title: '类型',
      dataIndex: 'type',
      hideInSearch: true,
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
          value: '2',
        }
      ],
      onFilter: (value, record) => record.type == value,
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
            className="chenxu-danger"
            onClick={() => {
              handleRemove(record, action)
            }}
          >删除</a>
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
          }}>新建</Button>,
          selectedRows && selectedRows.length > 0 && (
            <Button.Group >
              <Button
                onClick={async e => {
                  selectedRows.forEach(item => {
                    handleRemove(item, action)
                  });
                }}>批量删除</Button>
            </Button.Group>
          ),
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

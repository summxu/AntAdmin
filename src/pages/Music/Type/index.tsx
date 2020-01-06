import { Button, Divider, Form, message, Badge, Avatar } from 'antd';
import React, { useState } from 'react';

import { FormComponentProps } from 'antd/es/form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, UseFetchDataAction } from '@ant-design/pro-table';
import CreateForm from './components/CreateForm';

import { TableListItem } from './data.d';
import { queryRule, commit, detail, remove } from './service';
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

const status = ['正常', '删除'];
const statusMap = ['', 'success', 'error']

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
      title: '名称',
      dataIndex: 'name'
    }, {
      title: '排序',
      dataIndex: 'order'
    }, {
      title: '图片地址',
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
      title: '状态',
      dataIndex: 'status',
      hideInSearch: true,
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

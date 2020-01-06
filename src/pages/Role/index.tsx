import { Badge, Button, Divider, Form, message } from 'antd';
import React, { useState } from 'react';

import { FormComponentProps } from 'antd/es/form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, UseFetchDataAction } from '@ant-design/pro-table';
import CreateForm, { AddRoleType } from './components/CreateForm';
import UpdateForm, { FormValueType } from './components/UpdateForm';

import { TableListItem } from './data.d';
import { queryRule, enable, disable, commit, commitTree } from './service';
import 'antd/dist/antd.less';

interface TableListProps extends FormComponentProps { }

/**
 * 添加节点
 * @param fields
 */
const handleAdd = async (fields: AddRoleType) => {
  const hide = message.loading('正在添加');
  try {
    let params = {
      ...fields,
      status: fields.status ? 1 : 0
    }
    let res = await commit(params);
    hide();
    message.success(res.message);
    return true;
  } catch (error) {
    hide();
    return false;
  }
};

/**
 * 更新节点
 * @param fields
 */
const handleUpdate = async (fields: FormValueType) => {
  const hide = message.loading('正在配置');
  try {
    let res = await commitTree(fields);
    hide();
    message.success(res.message);
    return true;
  } catch (error) {
    hide();
    return false;
  }
};

/**
 *  删除节点
 * @param selectedRows
 */
const handleRemove = async (selectedRows: TableListItem[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    // await removeRule({
    //   key: selectedRows.map(row => row.key),
    // });
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};

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

const status = ['启用', '禁用'];
const statusMap = ['success', 'error'];

const TableList: React.FC<TableListProps> = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<any>(false);
  const [stepFormValues, setStepFormValues] = useState<any>({});

  const [actionRef, setActionRef] = useState<UseFetchDataAction<{ data: TableListItem[] }>>();
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '名称',
      dataIndex: 'name'
    }, {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      ellipsis: true,
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
      },
    }, {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record, index, action) => (
        <>
          <a
            onClick={() => {
              handleUpdateModalVisible(true);
              setStepFormValues(record);
            }}
          >设置权限</a>

          {record.status === 1 ? (
            <>
              <Divider type="vertical" />
              <a className="chenxu-danger" onClick={async e => {
                e.preventDefault()
                handleOption('disable', record, action)
              }} >禁用</a>
            </>
          ) : (<>
            <Divider type="vertical" />
            <a onClick={async e => {
              e.preventDefault()
              handleOption('enable', record, action)
            }} >启用</a>
          </>)}
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
        search={false}
        rowSelection={{
          type: "checkbox"
        }}
        renderToolBar={(action, { selectedRows }) => [
          <Button type="primary" onClick={e => {
            handleModalVisible(true)
          }}>新建</Button>,
          selectedRows && selectedRows.length > 0 && (
            <Button.Group >
              <Button
                onClick={async e => {
                  selectedRows.forEach(item => {
                    handleOption('enable', item, action)
                  });
                }}>批量启用</Button>
              <Button
                onClick={async e => {
                  selectedRows.forEach(item => {
                    handleOption('disable', item, action)
                  });
                }}>批量禁用</Button>
            </Button.Group>
          ),
        ]}
        request={params => queryRule(params).catch(err => { console.log(err) })}
        filterDate={(data: any): any[] => {
          return data.list
        }}
        columns={columns}
      />
      {/* 增加 */}
      <CreateForm
        onSubmit={async (value: any) => {
          const success = await handleAdd(value);
          if (success) {
            handleModalVisible(false);
            actionRef!.reload();
          }
        }}
        onCancel={() => handleModalVisible(false)}
        modalVisible={createModalVisible}
      />
      {/* 控制stepFormValues显示编辑按钮 */}
      {stepFormValues && Object.keys(stepFormValues).length ? (
        <UpdateForm
          onSubmit={async (value: any) => {
            const success = await handleUpdate(value);
            if (success) {
              handleModalVisible(false);
              setStepFormValues({});
              actionRef!.reload();
            }
          }}
          onCancel={() => {
            handleUpdateModalVisible(false);
            setStepFormValues({});
          }}
          updateModalVisible={updateModalVisible}
          values={stepFormValues}
        />
      ) : null}
    </PageHeaderWrapper>
  );
};

export default Form.create<TableListProps>()(TableList);

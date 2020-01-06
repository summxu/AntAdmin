import { Button, Divider, Form, message, Badge, Avatar } from 'antd';
import React, { useState } from 'react';

import { FormComponentProps } from 'antd/es/form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, UseFetchDataAction } from '@ant-design/pro-table';
import CreateForm from './components/CreateForm';

import { TableListItem } from './data.d';
import { queryRule, commit, detail } from './service';
import 'antd/dist/antd.less';

interface TableListProps extends FormComponentProps { }
const status = ['直播中', '未直播'];
const videoType = ['竖屏', '横屏'];
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
      title: '主播昵称',
      hideInSearch: true,
      dataIndex: 'nickname'
    }, {
      title: '房间编号',
      hideInSearch: true,
      dataIndex: 'num'
    }, {
      title: '打赏人数',
      hideInSearch: true,
      dataIndex: 'favour'
    }, {
      title: '在线人数',
      hideInSearch: true,
      dataIndex: 'count'
    }, {
      title: '本场收益虚拟币',
      hideInSearch: true,
      dataIndex: 'profit'
    },
    {
      title: '虚拟币费用',
      hideInSearch: true,
      dataIndex: 'virtualCurrency'
    }, {
      title: '播流地址',
      hideInSearch: true,
      dataIndex: 'pullFlowPath'
    }, {
      title: '直播分类',
      hideInSearch: true,
      dataIndex: 'typeName'
    }, {
      title: '直播开始时间',
      hideInSearch: true,
      dataIndex: 'startTime'
    }, {
      title: '直播结束时间',
      hideInSearch: true,
      dataIndex: 'entTime'
    }, {
      title: '房间状态',
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
      title: '视频类型',
      dataIndex: 'videoType',
      hideInSearch: true,
      key: 'videoType',
      valueEnum: {
        1: videoType[0],
        2: videoType[1]
      },
      filters: [
        {
          text: videoType[0],
          value: '1',
        }, {
          text: videoType[1],
          value: '2',
        }
      ],
      onFilter: (value, record) => record.videoType == value,
      render(text, row) {
        return <span>text</span>;
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

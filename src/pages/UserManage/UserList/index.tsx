import { Button, Divider, Avatar, Form, message } from 'antd';
import React, { useState, useRef } from 'react';

import { FormComponentProps } from 'antd/es/form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import ProTable, { ProColumns, ActionType } from '@ant-design/pro-table';
import CreateForm from './components/CreateForm';

import { TableListItem } from './data.d';
import { queryRule, setSuper, commit, enable, disable, detail, setDead } from './service';
import 'antd/dist/antd.less';

interface TableListProps extends FormComponentProps { }

const handleOption = async (type: string, record: TableListItem, action: ActionType) => {
  const hide = message.loading('正在执行');
  try {
    var params = {
      id: record.id
    }
    if (type == 'enable') {
      var res = await enable(params)
    } else if (type == 'disable') {
      var res = await disable(params)
    } else if (type == 'super') {
      var res = await setSuper(params)
    } else {
      var res = await setDead(params)
    }
    hide();
    message.success(res.message)
    action.reload()
  } catch (error) {
    hide();
    console.log(error);
  }
}

const status = ['启用', '冻结'];
const sex = ['女', '男'];
const type = ['普通用户', '主播', '分销商', '超管', '僵尸粉'];
const channel = ['PC', 'IOS', 'Android']

const TableList: React.FC<TableListProps> = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [windowObj, setWindowObj] = useState<any>({});
  const actionRef = useRef<ActionType>();

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
      dataIndex: 'mobile'
    }, {
      title: '头像',
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
      title: '用户等级',
      dataIndex: 'level',
      hideInSearch: true
    }, {
      title: '账户余额',
      dataIndex: 'balance',
      hideInSearch: true
    }, {
      title: '性别',
      hideInSearch: true,
      dataIndex: 'sex',
      valueEnum: {
        0: sex[0],
        1: sex[1]
      },
      filters: [
        {
          text: sex[0],
          value: '0',
        }, {
          text: sex[1],
          value: '1'
        }
      ],
      onFilter: (value, record) => record.sex == value,
      render(text, row) {
        return <span >{text}</span>
      },
    }, {
      title: '注册时邀请码',
      dataIndex: 'shareCode',
      hideInSearch: true
    }, {
      title: '累计虚拟票',
      dataIndex: 'totalTicket',
      hideInSearch: true
    }, {
      title: '累计充值虚拟币',
      dataIndex: 'totalVirtualCurrency',
      hideInSearch: true
    }, {
      title: '会员到期时间',
      dataIndex: 'vipEndTime',
      hideInSearch: true
    }, {
      title: '账户虚拟币',
      dataIndex: 'virtualCurrency',
      hideInSearch: true
    }, {
      title: '虚拟票',
      hideInSearch: true,
      dataIndex: 'virtualTicket'
    }, {
      title: '注册渠道',
      dataIndex: 'channel',
      valueEnum: {
        1: channel[0],
        2: channel[1],
        3: channel[2]
      },
      filters: [
        {
          text: channel[0],
          value: '1',
        }, {
          text: channel[1],
          value: '2'
        }, {
          text: channel[2],
          value: '3'
        }
      ],
      onFilter: (value, record) => record.channel == value,
      render(text, row) {
        return <span >{text}</span>
      },
    },
    {
      title: '用户类型',
      dataIndex: 'type',
      valueEnum: {
        1: type[0],
        2: type[1],
        3: type[2],
        4: type[3],
        5: type[4]
      },
      filters: [
        {
          text: type[0],
          value: '1',
        }, {
          text: type[1],
          value: '2'
        }, {
          text: type[2],
          value: '3'
        }, {
          text: type[3],
          value: '4'
        }, {
          text: type[4],
          value: '5'
        }
      ],
      onFilter: (value, record) => record.type == value,
      render(text, row) {
        return <span >{text}</span>
      },
    }, {
      title: '状态',
      dataIndex: 'status',
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
              handleOption('dead', record, action)
            }}
          >设置僵尸粉</a>
          <Divider type="vertical" />
          <a
            onClick={() => {
              handleOption('super', record, action)
            }}
          >设置超管</a>
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
          >冻结</a>)}
        </>
      ),
    },
  ];

  return (
    <PageHeaderWrapper>
      <ProTable<TableListItem>
        headerTitle="查询表格"
        actionRef={actionRef}
        rowKey="id"
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
                    handleOption('disable', item, action)
                  });
                }}>批量冻结</Button>
              <Button
                onClick={async e => {
                  selectedRows.forEach(item => {
                    handleOption('enable', item, action)
                  });
                }}>批量启用</Button>
              <Button
                onClick={async e => {
                  selectedRows.forEach(item => {
                    handleOption('super', item, action)
                  });
                }}>批量设置超管</Button>
              <Button
                onClick={async e => {
                  selectedRows.forEach(item => {
                    handleOption('deal', item, action)
                  });
                }}>批量设置僵尸粉</Button>

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
          await handleCUR(value);
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

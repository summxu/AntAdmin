import { Button, DatePicker, Form, Input, Modal, Tree, Select, Steps } from 'antd';
import React, { Component } from 'react';
import { FormComponentProps } from 'antd/es/form';
import { TableListItem } from '../data.d';
import { menuTree, findTree } from "../service";
import PageLoading from "@/components/PageLoading";
const { TreeNode } = Tree;

export interface FormValueType extends Partial<TableListItem> {
  ids: string;
  id?: number;
}

export interface UpdateFormProps extends FormComponentProps {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => void;
  updateModalVisible: boolean;
  values: any;
}

export interface UpdateFormState {
  treeData: any[];
  checkedKeys: any;
  defaultCheckedKeys: any;
  currentStep: number;
}



class UpdateForm extends Component<UpdateFormProps, UpdateFormState> {
  static defaultProps = {
    handleUpdate: () => { },
    handleUpdateModalVisible: () => { },
    values: {},
  };

  constructor(props: UpdateFormProps) {
    super(props);

    this.state = {
      treeData: [],
      checkedKeys: [],
      defaultCheckedKeys: undefined,
      currentStep: 0
    };
  }

  componentDidMount() {
    menuTree().then(res => {
      this.setState({ treeData: res.data })
      this.setChecked()
    })
  }

  setChecked: any = async () => {
    try {
      let res = await findTree({ id: this.props.values.id })
      this.setState({ defaultCheckedKeys: res.data.map(String) })
    } catch (error) {
      console.log(error);
    }
  }

  okHandle = () => {
    this.props.onSubmit({
      ids: this.state.checkedKeys.toString(),
      id: this.props.values.id
    })
  };

  renderTreeNodes = (data: any) =>
    data.map((item: any) => {
      if (item.children) {
        return (
          <TreeNode title={item.name} key={item.id} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode key={item.key} {...item} dataRef={item} />;
    });

  expandedKeys = (data: any) =>
    data.map((item: any) => {
      if (item.children) {
        return (
          this.expandedKeys(item.children)
        );
      }
      return item.id;
    });


  render() {
    const { updateModalVisible, onCancel: handleUpdateModalVisible, values } = this.props;
    const { treeData } = this.state
    console.log();
    return (
      <Modal
        width={640}
        bodyStyle={{ padding: '32px 40px 48px' }}
        destroyOnClose
        title="权限配置"
        visible={updateModalVisible}
        onCancel={() => handleUpdateModalVisible(false, values)}
        afterClose={() => handleUpdateModalVisible()}
        onOk={this.okHandle}
      >

        {
          this.state.defaultCheckedKeys ? null : (<PageLoading></PageLoading>)
        }
        {
          treeData.length && this.state.defaultCheckedKeys ? (<Tree
            defaultExpandAll
            checkable
            selectable={false}
            defaultCheckedKeys={this.state.defaultCheckedKeys}
            onCheck={(checkedKeys) => {
              this.setState({ checkedKeys: checkedKeys })
            }}
          >{this.renderTreeNodes(treeData)}</Tree>) : null
        }
      </Modal >
    );
  }
}

export default Form.create<UpdateFormProps>()(UpdateForm);
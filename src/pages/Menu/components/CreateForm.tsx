import { Form, Input, Select, Modal } from 'antd';

import { FormComponentProps } from 'antd/es/form';
import React from 'react';

const FormItem = Form.Item;
const { Option } = Select

interface CreateFormProps extends FormComponentProps {
  modalVisible: boolean;
  windowObj: any;
  onSubmit: (fieldsValue: AddRoleType) => void;
  onCancel: () => void;
}

export interface AddRoleType {
  id: number;
  icon: string;
  orderNum: number;
  parentId: number;
  perms: string;
  type: number;
  typeStr: string;
  name: string;
  status: boolean;
}

const CreateForm: React.FC<CreateFormProps> = props => {
  const { modalVisible, form, onSubmit: handleAdd, onCancel, windowObj } = props;

  const okHandle = () => {
    form.validateFields((err, fieldsValue: AddRoleType) => {
      if (err) return;
      form.resetFields();
      fieldsValue.id = windowObj.data ? windowObj.data.id : undefined
      handleAdd(fieldsValue);
    });
  };

  return (
    <Modal
      destroyOnClose
      title={windowObj.title}
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => onCancel()}
    >
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="菜单名称">
        {form.getFieldDecorator('name', {
          initialValue: windowObj.data ? windowObj.data.name : '',
          rules: [{ required: true, message: '请输入菜单名称' }],
        })(<Input placeholder="请输入菜单名称" />)}
      </FormItem>

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="菜单URL">
        {form.getFieldDecorator('url', {
          initialValue: windowObj.data ? windowObj.data.url : '',
          rules: [{ required: true, message: '请输入菜单URL' }],
        })(<Input placeholder="请输入菜单URL" />)}
      </FormItem>

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="菜单ICON">
        {form.getFieldDecorator('icon', {
          initialValue: windowObj.data ? windowObj.data.icon : '',
          rules: [{ required: true, message: '请输入菜单ICON' }],
        })(<Input placeholder="请输入菜单ICON" />)}
      </FormItem>

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="菜单权限">
        {form.getFieldDecorator('perms', {
          initialValue: windowObj.data ? windowObj.data.perms : '',
          rules: [{ required: true, message: '请输入菜单权限' }],
        })(<Input placeholder="请输入菜单权限" />)}
      </FormItem>

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="菜单排序">
        {form.getFieldDecorator('orderNum', {
          initialValue: windowObj.data ? windowObj.data.orderNum : '',
          rules: [{ required: true, message: '请输入菜单排序' }],
        })(<Input type="number" placeholder="请输入菜单排序" />)}
      </FormItem>

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="父级ID">
        {form.getFieldDecorator('parentId', {
          initialValue: windowObj.data ? windowObj.data.parentId : '',
        })(<Input placeholder="请输入父级ID" />)}
      </FormItem>

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="菜单类型">
        {form.getFieldDecorator('type', {
          initialValue: windowObj.data ? windowObj.data.type : ''
        })(<Select style={{ width: "100%" }}>
          <Option value={1}>菜单</Option>
          <Option value={2}>功能</Option>
        </Select>)}
      </FormItem>
    </Modal>
  );
};

export default Form.create<CreateFormProps>()(CreateForm);

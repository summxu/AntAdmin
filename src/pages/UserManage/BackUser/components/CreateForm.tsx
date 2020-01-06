import { Form, Input, Select, Modal } from 'antd';

import { FormComponentProps } from 'antd/es/form';
import React from 'react';
import { TableListItem } from "../data";

const FormItem = Form.Item;
const { Option } = Select

interface CreateFormProps extends FormComponentProps {
  modalVisible: boolean;
  windowObj: any;
  onSubmit: (fieldsValue: AddRoleType) => void;
  onCancel: () => void;
}

export interface AddRoleType extends TableListItem { }

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
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="用户名称">
        {form.getFieldDecorator('username', {
          initialValue: windowObj.data ? windowObj.data.username : '',
          rules: [{ required: true, message: '请输入用户名称' }],
        })(<Input placeholder="请输入用户名称" />)}
      </FormItem>

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="密码">
        {form.getFieldDecorator('password', {
          initialValue: windowObj.data ? windowObj.data.password : '',
          rules: [{ required: true, message: '请输入密码' }],
        })(<Input placeholder="请输入密码" />)}
      </FormItem>

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="昵称">
        {form.getFieldDecorator('nickname', {
          initialValue: windowObj.data ? windowObj.data.nickname : '',
          rules: [{ required: true, message: '请输入昵称' }],
        })(<Input placeholder="请输入昵称" />)}
      </FormItem>

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="手机号">
        {form.getFieldDecorator('mobile', {
          initialValue: windowObj.data ? windowObj.data.mobile : '',
          rules: [{ required: true, message: '请输入手机号' }],
        })(<Input type="number" placeholder="请输入手机号" />)}
      </FormItem>

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="密码盐">
        {form.getFieldDecorator('salt', {
          initialValue: windowObj.data ? windowObj.data.salt : '',
        })(<Input placeholder="请输入密码盐" />)}
      </FormItem>

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="状态">
        {form.getFieldDecorator('status', {
          initialValue: windowObj.data ? windowObj.data.status : ''
        })(<Select style={{ width: "100%" }}>
          <Option value={1}>启用</Option>
          <Option value={2}>禁用</Option>
        </Select>)}
      </FormItem>
    </Modal>
  );
};

export default Form.create<CreateFormProps>()(CreateForm);

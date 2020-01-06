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
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="用户昵称">
        {form.getFieldDecorator('nickname', {
          initialValue: windowObj.data ? windowObj.data.nickname : '',
          rules: [{ required: true, message: '请输入用户昵称' }],
        })(<Input placeholder="请输入用户昵称" />)}
      </FormItem>

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="手机号">
        {form.getFieldDecorator('mobile', {
          initialValue: windowObj.data ? windowObj.data.mobile : '',
          rules: [{ required: true, message: '请输入手机号' }],
        })(<Input type="number" placeholder="请输入手机号" />)}
      </FormItem>

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="性别">
        {form.getFieldDecorator('sex', {
          initialValue: windowObj.data ? windowObj.data.sex : ''
        })(<Select style={{ width: "100%" }}>
          <Option value={1}>男</Option>
          <Option value={0}>女</Option>
        </Select>)}
      </FormItem>

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="用户等级">
        {form.getFieldDecorator('level', {
          initialValue: windowObj.data ? windowObj.data.level : '',
        })(<Input type='number' placeholder="请输入用户等级" />)}
      </FormItem>

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="经验值">
        {form.getFieldDecorator('exp', {
          initialValue: windowObj.data ? windowObj.data.exp : '',
        })(<Input type='number' placeholder="请输入经验值" />)}
      </FormItem>

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="账户余额">
        {form.getFieldDecorator('balance', {
          initialValue: windowObj.data ? windowObj.data.balance : '',
        })(<Input type='number' placeholder="请输入账户余额" />)}
      </FormItem>

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="账户虚拟币">
        {form.getFieldDecorator('virtualCurrency', {
          initialValue: windowObj.data ? windowObj.data.virtualCurrency : '',
        })(<Input type='number' placeholder="请输入账户虚拟币" />)}
      </FormItem>

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="虚拟票">
        {form.getFieldDecorator('virtualTicket', {
          initialValue: windowObj.data ? windowObj.data.virtualTicket : '',
        })(<Input type='number' placeholder="请输入虚拟票" />)}
      </FormItem>

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="注册时邀请码">
        {form.getFieldDecorator('shareCode', {
          initialValue: windowObj.data ? windowObj.data.shareCode : '',
        })(<Input placeholder="请输入注册时邀请码" />)}
      </FormItem>

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="用户类型">
        {form.getFieldDecorator('type', {
          initialValue: windowObj.data ? windowObj.data.type : ''
        })(<Select style={{ width: "100%" }}>
          <Option value={1}>普通用户</Option>
          <Option value={2}>主播</Option>
          <Option value={3}>分销商</Option>
          <Option value={4}>超管</Option>
          <Option value={5}>僵尸粉</Option>
        </Select>)}
      </FormItem>

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="状态">
        {form.getFieldDecorator('status', {
          initialValue: windowObj.data ? windowObj.data.status : ''
        })(<Select style={{ width: "100%" }}>
          <Option value={1}>启用</Option>
          <Option value={2}>冻结</Option>
        </Select>)}
      </FormItem>
    </Modal>
  );
};

export default Form.create<CreateFormProps>()(CreateForm);

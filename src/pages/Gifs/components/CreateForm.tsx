import { Form, Input, Select, Modal } from 'antd';

import { FormComponentProps } from 'antd/es/form';
import { TableListItem } from '../data';
import React from 'react';

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
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="名称">
        {form.getFieldDecorator('name', {
          initialValue: windowObj.data ? windowObj.data.name : '',
          rules: [{ required: true, message: '请输入名称' }],
        })(<Input placeholder="请输入名称" />)}
      </FormItem>

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="所需虚拟币">
        {form.getFieldDecorator('virtualCurrency', {
          initialValue: windowObj.data ? windowObj.data.virtualCurrency : '',
          rules: [{ required: true, message: '请输入所需虚拟币' }],
        })(<Input type="number" placeholder="请输入所需虚拟币" />)}
      </FormItem>

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="动画时间">
        {form.getFieldDecorator('time', {
          initialValue: windowObj.data ? windowObj.data.time : '',
          rules: [{ required: true, message: '请输入动画时间' }],
        })(<Input placeholder="请输入动画时间" />)}
      </FormItem>

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="动画类型">
        {form.getFieldDecorator('gitType', {
          initialValue: windowObj.data ? windowObj.data.gitType : ''
        })(<Select style={{ width: "100%" }}>
          <Option value={1}>Gif</Option>
          <Option value={2}>svga</Option>
        </Select>)}
      </FormItem>

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="状态">
        {form.getFieldDecorator('status', {
          initialValue: windowObj.data ? windowObj.data.status : ''
        })(<Select style={{ width: "100%" }}>
          <Option value={1}>正常</Option>
          <Option value={2}>删除</Option>
        </Select>)}
      </FormItem>

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="礼物类型">
        {form.getFieldDecorator('type', {
          initialValue: windowObj.data ? windowObj.data.type : ''
        })(<Select style={{ width: "100%" }}>
          <Option value={1}>普通礼物</Option>
          <Option value={2}>豪华礼物</Option>
        </Select>)}
      </FormItem>

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="状态">
        {form.getFieldDecorator('tag', {
          initialValue: windowObj.data ? windowObj.data.tag : ''
        })(<Select style={{ width: "100%" }}>
          <Option value={1}>普通</Option>
          <Option value={2}>热门</Option>
          <Option value={3}>守护</Option>
        </Select>)}
      </FormItem>
    </Modal>
  );
};

export default Form.create<CreateFormProps>()(CreateForm);

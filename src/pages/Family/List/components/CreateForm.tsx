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
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="家族名称">
        {form.getFieldDecorator('name', {
          initialValue: windowObj.data ? windowObj.data.name : '',
          rules: [{ required: true, message: '请输入家族名称' }],
        })(<Input placeholder="请输入家族名称" />)}
      </FormItem>

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="家族简介">
        {form.getFieldDecorator('content', {
          initialValue: windowObj.data ? windowObj.data.content : '',
          rules: [{ required: true, message: '请输入家族简介' }],
        })(<Input placeholder="请输入家族简介" />)}
      </FormItem>

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="抽成">
        {form.getFieldDecorator('percentage', {
          initialValue: windowObj.data ? windowObj.data.percentage : '',
          rules: [{ required: true, message: '请输入抽成' }],
        })(<Input type="number" placeholder="请输入抽成" />)}
      </FormItem>

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="状态">
        {form.getFieldDecorator('status', {
          initialValue: windowObj.data ? windowObj.data.status : ''
        })(<Select style={{ width: "100%" }}>
          <Option value={1}>未审核</Option>
          <Option value={2}>审核成功</Option>
          <Option value={3}>审核失败</Option>
          <Option value={4}>删除</Option>
        </Select>)}
      </FormItem>
    </Modal>
  );
};

export default Form.create<CreateFormProps>()(CreateForm);

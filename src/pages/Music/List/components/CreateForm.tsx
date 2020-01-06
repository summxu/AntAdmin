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
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="歌名">
        {form.getFieldDecorator('name', {
          initialValue: windowObj.data ? windowObj.data.name : '',
          rules: [{ required: true, message: '请输入歌名' }],
        })(<Input placeholder="请输入歌名" />)}
      </FormItem>

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="演唱者">
        {form.getFieldDecorator('person', {
          initialValue: windowObj.data ? windowObj.data.person : '',
          rules: [{ required: true, message: '请输入演唱者' }],
        })(<Input placeholder="请输入演唱者" />)}
      </FormItem>

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="被使用次数">
        {form.getFieldDecorator('count', {
          initialValue: windowObj.data ? windowObj.data.count : '',
          rules: [{ required: true, message: '请输入被使用次数' }],
        })(<Input placeholder="请输入被使用次数" />)}
      </FormItem>

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="音乐地址">
        {form.getFieldDecorator('filePath', {
          initialValue: windowObj.data ? windowObj.data.filePath : '',
          rules: [{ required: true, message: '请输入音乐地址' }],
        })(<Input placeholder="请输入音乐地址" />)}
      </FormItem>

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="状态">
        {form.getFieldDecorator('status', {
          initialValue: windowObj.data ? windowObj.data.status : ''
        })(<Select style={{ width: "100%" }}>
          <Option value={1}>正常</Option>
          <Option value={2}>删除</Option>
        </Select>)}
      </FormItem>
    </Modal>
  );
};

export default Form.create<CreateFormProps>()(CreateForm);

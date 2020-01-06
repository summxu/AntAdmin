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
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="虚拟币">
        {form.getFieldDecorator('virtualCurrency', {
          initialValue: windowObj.data ? windowObj.data.virtualCurrency : '',
          rules: [{ required: true, message: '请输入虚拟币' }],
        })(<Input type="number" placeholder="请输入虚拟币" />)}
      </FormItem>

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="时长">
        {form.getFieldDecorator('month', {
          initialValue: windowObj.data ? windowObj.data.month : '',
          rules: [{ required: true, message: '请输入时长' }],
        })(<Input className="form-left-label" type="number" placeholder="请输入时长" />)}
        <span className="form-right-label">单位：月</span>
      </FormItem>

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="排序">
        {form.getFieldDecorator('order', {
          initialValue: windowObj.data ? windowObj.data.order : '',
          rules: [{ required: true, message: '请输入排序' }],
        })(<Input type="number" placeholder="请输入排序" />)}
      </FormItem>
    </Modal>
  );
};

export default Form.create<CreateFormProps>()(CreateForm);

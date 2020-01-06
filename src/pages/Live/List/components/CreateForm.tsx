import { Form, Input, Select, Modal, Radio } from 'antd';

import { FormComponentProps } from 'antd/es/form';
import { TableListItem } from '../data';
import React from 'react';

const FormItem = Form.Item;
const { Option } = Select
const { TextArea } = Input

interface CreateFormProps extends FormComponentProps {
  modalVisible: boolean;
  windowObj: any;
  onSubmit: (fieldsValue: AddRoleType) => void;
  onCancel: () => void;
}

export interface AddRoleType extends TableListItem {
  pwdRoom: number;
  ticketRoom: number;
  timeRoom: number;
  timeMoney: number;
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
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="密码房间">
        {form.getFieldDecorator('pwdRoom', {
          initialValue: windowObj.data ? windowObj.data.pwdRoom : '',
          rules: [{ required: true, message: '请输入密码房间' }],
        })(<Radio.Group>
          <Radio value={0}>关闭</Radio>
          <Radio value={1}>开启</Radio>
        </Radio.Group>)}
      </FormItem>

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="门票房间">
        {form.getFieldDecorator('ticketRoom', {
          initialValue: windowObj.data ? windowObj.data.ticketRoom : '',
          rules: [{ required: true, message: '请输入门票房间' }],
        })(<Radio.Group>
          <Radio value={0}>关闭</Radio>
          <Radio value={1}>开启</Radio>
        </Radio.Group>)}
      </FormItem>

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="计时房间">
        {form.getFieldDecorator('timeRoom', {
          initialValue: windowObj.data ? windowObj.data.timeRoom : '',
          rules: [{ required: true, message: '请输入计时房间' }],
        })(<Radio.Group>
          <Radio value={0}>关闭</Radio>
          <Radio value={1}>开启</Radio>
        </Radio.Group>)}
      </FormItem>

      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 5 }} label="计时收费(每小时)">
        {form.getFieldDecorator('pwdRoom', {
          initialValue: windowObj.data ? windowObj.data.pwdRoom : '',
          rules: [{ required: true, message: '请输入计时收费' }],
        })(<Input type="number" placeholder="请输入计时收费" />)}
      </FormItem>


    </Modal>
  );
};

export default Form.create<CreateFormProps>()(CreateForm);

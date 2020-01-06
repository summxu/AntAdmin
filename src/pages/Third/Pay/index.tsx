import {
  Button,
  Card,
  Form,
  Input,
  Switch
} from 'antd';

import React, { Component } from 'react';

import { Dispatch } from 'redux';
import { FormComponentProps } from 'antd/es/form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import './style.less';

const FormItem = Form.Item;

interface PayProps extends FormComponentProps {
  submitting: boolean;
  systemAndPay: any;
  dispatch: Dispatch<any>;
}

class Pay extends Component<PayProps> {

  componentDidMount() {
    const { dispatch } = this.props
    dispatch({
      type: 'systemAndPay/getConfig'
    });
  }

  handleSubmit = (e: React.FormEvent) => {
    const { dispatch, form } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch({
          type: 'systemAndPay/submitRegularForm',
          payload: values,
        });
      }
    });
  };

  render() {
    const { submitting, systemAndPay } = this.props;
    const {
      form: { getFieldDecorator },
    } = this.props;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
        md: { span: 4 },
        lg: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
        md: { span: 16 },
        lg: { span: 14 }
      },
    };

    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 4 },
        md: { span: 10, offset: 4 },
        lg: { span: 10, offset: 4 }
      },
    };
    return (
      <PageHeaderWrapper >
        <Card bordered={false}>
          <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>

            <Form.Item {...formItemLayout} label="支付宝PC支付">
              {getFieldDecorator('aliPcPower', {
                valuePropName: 'checked',
                initialValue: systemAndPay.fieldValue.aliPcPower,
              })(<Switch />)}
            </Form.Item>

            <Form.Item {...formItemLayout} label="支付宝App支付">
              {getFieldDecorator('aliPower', {
                valuePropName: 'checked',
                initialValue: systemAndPay.fieldValue.aliPower,
              })(<Switch />)}
            </Form.Item>

            <FormItem {...formItemLayout} label='支付宝Appid'>
              {getFieldDecorator('aliAppid', {
                initialValue: systemAndPay.fieldValue.aliAppid,
                rules: [
                  {
                    required: true,
                    message: '请输入支付宝Appid',
                  }
                ],
              })(<Input placeholder='请输入支付宝Appid' />)}
            </FormItem>

            <FormItem {...formItemLayout} label='支付宝账号'>
              {getFieldDecorator('aliUsername', {
                initialValue: systemAndPay.fieldValue.aliUsername,
                rules: [
                  {
                    required: true,
                    message: '请输入支付宝账号',
                  },
                ],
              })(<Input placeholder='请输入支付宝账号' />)}
            </FormItem>

            <FormItem {...formItemLayout} label='支付宝安卓密钥'>
              {getFieldDecorator('aliAndroidSecret', {
                initialValue: systemAndPay.fieldValue.aliAndroidSecret,
                rules: [
                  {
                    required: true,
                    message: '请输入支付宝安卓密钥',
                  },
                ],
              })(<Input placeholder='请输入支付宝安卓密钥' />)}
            </FormItem>

            <FormItem {...formItemLayout} label='支付宝苹果密钥'>
              {getFieldDecorator('aliIosSecret', {
                initialValue: systemAndPay.fieldValue.aliIosSecret,
                rules: [
                  {
                    required: true,
                    message: '请输入支付宝苹果密钥',
                  },
                ],
              })(<Input placeholder='请输入支付宝苹果密钥' />)}
            </FormItem>

            <Form.Item {...formItemLayout} label="微信App支付">
              {getFieldDecorator('weixinPower', {
                valuePropName: 'checked',
                initialValue: systemAndPay.fieldValue.weixinPower,
              })(<Switch />)}
            </Form.Item>

            <Form.Item {...formItemLayout} label="微信PC支付">
              {getFieldDecorator('weixinPcPower', {
                valuePropName: 'checked',
                initialValue: systemAndPay.fieldValue.weixinPcPower,
              })(<Switch />)}
            </Form.Item>

            <FormItem {...formItemLayout} label='微信AppID'>
              {getFieldDecorator('weixinAppid', {
                initialValue: systemAndPay.fieldValue.weixinAppid,
                rules: [
                  {
                    required: true,
                    message: '请输入微信AppID',
                  },
                ],
              })(<Input placeholder='请输入微信AppID' />)}
            </FormItem>

            <FormItem {...formItemLayout} label='微信AppSecret'>
              {getFieldDecorator('weixinSecret', {
                initialValue: systemAndPay.fieldValue.weixinSecret,
                rules: [
                  {
                    required: true,
                    message: '请输入微信AppSecret',
                  },
                ],
              })(<Input placeholder='请输入微信AppSecret' />)}
            </FormItem>


            <FormItem {...formItemLayout} label='微信密钥Key'>
              {getFieldDecorator('weixinSecretKey', {
                initialValue: systemAndPay.fieldValue.weixinSecretKey,
                rules: [
                  {
                    required: true,
                    message: '微信密钥Key',
                  },
                ],
              })(<Input placeholder='微信密钥Key' />)}
            </FormItem>


            <FormItem {...formItemLayout} label='微信商户号Mchid'>
              {getFieldDecorator('weixinMchid', {
                initialValue: systemAndPay.fieldValue.weixinMchid,
                rules: [
                  {
                    required: true,
                    message: '请输入微信商户号Mchid',
                  },
                ],
              })(<Input placeholder='请输入微信商户号Mchid' />)}
            </FormItem>

            <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button type="primary" htmlType="submit" loading={submitting}>
                提交
              </Button>

            </FormItem>
          </Form>
        </Card>
      </PageHeaderWrapper>
    );
  }
}

interface mapStateType {
  loading: {
    effects: {
      [key: string]: boolean
    }
  },
  systemAndPay: any
}

export default Form.create<PayProps>()(
  connect(({ loading, systemAndPay }: mapStateType) => ({
    submitting: loading.effects['systemAndPay/submitRegularForm'],
    systemAndPay
  }))(Pay),
);

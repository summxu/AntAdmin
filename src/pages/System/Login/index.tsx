import {
  Button,
  Card,
  Form,
  Input,
  Switch,
  InputNumber
} from 'antd';
import React, { Component } from 'react';
import { Dispatch } from 'redux';
import { FormComponentProps } from 'antd/es/form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import './style.less';

const { TextArea } = Input;
const FormItem = Form.Item;

interface LoginProps extends FormComponentProps {
  submitting: boolean;
  systemAndLogin: any;
  dispatch: Dispatch<any>;
}

class Login extends Component<LoginProps> {

  componentDidMount() {
    const { dispatch } = this.props
    dispatch({
      type: 'systemAndLogin/getConfig'
    });
  }

  handleSubmit = (e: React.FormEvent) => {
    const { dispatch, form } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch({
          type: 'systemAndLogin/submitRegularForm',
          payload: values,
        });
      }
    });
  };

  render() {
    const { submitting, systemAndLogin } = this.props;
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

            <Form.Item {...formItemLayout} label="登录奖励">
              {getFieldDecorator('loginPower', {
                valuePropName: 'checked',
                initialValue: systemAndLogin.fieldValue.loginPower,
              })(<Switch />)}
            </Form.Item>

            <FormItem
              help="微信开放平台网页应用 AppID"
              {...formItemLayout}
              label='微信网页应用AppID'>
              {getFieldDecorator('pcWeixinAppid', {
                initialValue: systemAndLogin.fieldValue.pcWeixinAppid
              })(<Input placeholder='请输入微信开放平台网页应用 AppID' />)}
            </FormItem>

            <FormItem
              help="微信开放平台网页应用 AppSecret"
              {...formItemLayout}
              label='微信网页应用AppSecret'>
              {getFieldDecorator('pcWeixinSecret', {
                initialValue: systemAndLogin.fieldValue.pcWeixinSecret
              })(<Input placeholder='请输入微信开放平台网页应用 AppSecret' />)}
            </FormItem>

            <FormItem
              {...formItemLayout}
              label='微信公众平台AppSecret'>
              {getFieldDecorator('weixinSecret', {
                initialValue: systemAndLogin.fieldValue.weixinSecret
              })(<Input placeholder='请输入微信公众平台AppSecret' />)}
            </FormItem>

            <FormItem
              {...formItemLayout}
              label='微信公众平台Appid'>
              {getFieldDecorator('weixinAppid', {
                initialValue: systemAndLogin.fieldValue.weixinAppid
              })(<Input placeholder='请输入微信公众平台Appid' />)}
            </FormItem>

            <FormItem
              {...formItemLayout}
              label='阿里云 SignName'>
              {getFieldDecorator('smsSignName', {
                initialValue: systemAndLogin.fieldValue.smsSignName
              })(<Input placeholder='请输入阿里云 SignName' />)}
            </FormItem>

            <FormItem {...formItemLayout} label='短信模板'>
              {getFieldDecorator('smsTemplate', {
                initialValue: systemAndLogin.fieldValue.smsTemplate
              })(<TextArea
                placeholder="请输入短信模板"
                autoSize={{ minRows: 3, maxRows: 6 }}
              />)}
            </FormItem>

            <FormItem
              {...formItemLayout}
              label='阿里云 AccessSecret'>
              {getFieldDecorator('smsAccessSecret', {
                initialValue: systemAndLogin.fieldValue.smsAccessSecret
              })(<Input placeholder='请输入阿里云 AccessSecret' />)}
            </FormItem>

            <FormItem
              {...formItemLayout}
              label='阿里云 AccessKey'>
              {getFieldDecorator('smsAccessKey', {
                initialValue: systemAndLogin.fieldValue.smsAccessKey
              })(<Input placeholder='请输入阿里云 AccessKey' />)}
            </FormItem>

            <Form.Item {...formItemLayout} label="短信开关">
              {getFieldDecorator('smsPower', {
                valuePropName: 'checked',
                initialValue: systemAndLogin.fieldValue.smsPower,
              })(<Switch />)}
            </Form.Item>

            <Form.Item {...formItemLayout} label="短信ip限制开关">
              {getFieldDecorator('smsIpPower', {
                valuePropName: 'checked',
                initialValue: systemAndLogin.fieldValue.smsIpPower,
              })(<Switch />)}
            </Form.Item>

            <FormItem
              {...formItemLayout}
              help="同一IP每天可以发送验证码的最大次数"
              label='最大发送次数'>
              {getFieldDecorator('smsIpCount', {
                initialValue: systemAndLogin.fieldValue.smsIpCount
              })(<InputNumber min={1} step={1} />)}
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
  systemAndLogin: any
}

export default Form.create<LoginProps>()(
  connect(({ loading, systemAndLogin }: mapStateType) => ({
    submitting: loading.effects['systemAndLogin/submitRegularForm'],
    systemAndLogin
  }))(Login),
);

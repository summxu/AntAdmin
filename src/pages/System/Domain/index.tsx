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

const { TextArea } = Input;
const FormItem = Form.Item;

interface DomainProps extends FormComponentProps {
  submitting: boolean;
  systemAndDomain: any;
  dispatch: Dispatch<any>;
}

class Domain extends Component<DomainProps> {

  componentDidMount() {
    const { dispatch } = this.props
    dispatch({
      type: 'systemAndDomain/getConfig'
    });
  }

  handleSubmit = (e: React.FormEvent) => {
    const { dispatch, form } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch({
          type: 'systemAndDomain/submitRegularForm',
          payload: values,
        });
      }
    });
  };

  render() {
    const { submitting, systemAndDomain } = this.props;
    const {
      form: { getFieldDecorator, getFieldValue },
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

            <FormItem {...formItemLayout} label='网站标题'>
              {getFieldDecorator('titel', {
                initialValue: systemAndDomain.fieldValue.titel
              })(<Input placeholder='请输入网站标题' />)}
            </FormItem>

            <FormItem {...formItemLayout} label='网站域名'>
              {getFieldDecorator('domain', {
                initialValue: systemAndDomain.fieldValue.domain
              })(<Input placeholder='请输入网站域名' />)}
            </FormItem>

            <FormItem {...formItemLayout} label='版权信息'>
              {getFieldDecorator('copyright', {
                initialValue: systemAndDomain.fieldValue.copyright
              })(<Input placeholder='请输入版权信息' />)}
            </FormItem>

            <FormItem {...formItemLayout} label='虚拟货币名称'>
              {getFieldDecorator('virtualCurrency', {
                initialValue: systemAndDomain.fieldValue.virtualCurrency
              })(<Input placeholder='请输入虚拟货币名称' />)}
            </FormItem>

            <FormItem {...formItemLayout} label='虚拟票名称'>
              {getFieldDecorator('virtualTicket', {
                initialValue: systemAndDomain.fieldValue.virtualTicket
              })(<Input placeholder='请输入虚拟票名称' />)}
            </FormItem>


            <FormItem {...formItemLayout} label='公司电话'>
              {getFieldDecorator('phone', {
                initialValue: systemAndDomain.fieldValue.phone
              })(<Input placeholder='请输入公司电话' />)}
            </FormItem>

            <FormItem {...formItemLayout} label='公司地址'>
              {getFieldDecorator('address', {
                initialValue: systemAndDomain.fieldValue.address
              })(<Input placeholder='请输入公司地址' />)}
            </FormItem>

            <FormItem {...formItemLayout} label='安卓下载码图片地址'>
              {getFieldDecorator('androidPath', {
                initialValue: systemAndDomain.fieldValue.androidPath
              })(<Input placeholder='请输入安卓下载码图片地址' />)}
            </FormItem>

            <FormItem {...formItemLayout} label='Ios下载码图片地址'>
              {getFieldDecorator('iosPath', {
                initialValue: systemAndDomain.fieldValue.iosPath
              })(<Input placeholder='请输入Ios下载码图片地址' />)}
            </FormItem>

            <FormItem {...formItemLayout} label='微信公众号二维码地址'>
              {getFieldDecorator('weixinPath', {
                initialValue: systemAndDomain.fieldValue.weixinPath
              })(<Input placeholder='请输入微信公众号二维码地址' />)}
            </FormItem>

            <FormItem {...formItemLayout} label='官微图标地址'>
              {getFieldDecorator('iconPath', {
                initialValue: systemAndDomain.fieldValue.iconPath
              })(<Input placeholder='请输入官微图标地址' />)}
            </FormItem>

            <FormItem {...formItemLayout} label='官微标题'>
              {getFieldDecorator('weiboTitle', {
                initialValue: systemAndDomain.fieldValue.weiboTitle
              })(<Input placeholder='请输入官微标题' />)}
            </FormItem>

            <FormItem {...formItemLayout} label='官微网站'>
              {getFieldDecorator('weiboUrl', {
                initialValue: systemAndDomain.fieldValue.weiboUrl
              })(<Input placeholder='请输入官微网站' />)}
            </FormItem>

            <Form.Item {...formItemLayout} label="网站维护">
              {getFieldDecorator('maintain', {
                valuePropName: 'checked',
                initialValue: systemAndDomain.fieldValue.maintain,
              })(<Switch />)}
            </Form.Item>

            <FormItem {...formItemLayout} label='维护提示'>
              {getFieldDecorator('maintainContent', {
                initialValue: systemAndDomain.fieldValue.maintainContent
              })(<TextArea
                disabled={!getFieldValue('maintain')}
                placeholder="请输入维护提示"
                autoSize={{ minRows: 3, maxRows: 6 }}
              />)}
            </FormItem>

            <FormItem {...formItemLayout} label='官微简介'>
              {getFieldDecorator('weiboContent', {
                initialValue: systemAndDomain.fieldValue.weiboContent
              })(<TextArea
                placeholder="请输入官微简介"
                autoSize={{ minRows: 3, maxRows: 6 }}
              />)}
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
  systemAndDomain: any
}

export default Form.create<DomainProps>()(
  connect(({ loading, systemAndDomain }: mapStateType) => ({
    submitting: loading.effects['systemAndDomain/submitRegularForm'],
    systemAndDomain
  }))(Domain),
);

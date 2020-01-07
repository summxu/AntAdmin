import {
  Button,
  Card,
  Form,
  Input,
} from 'antd';

import React, { Component } from 'react';

import { Dispatch } from 'redux';
import { FormComponentProps } from 'antd/es/form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import './style.less';

const FormItem = Form.Item;

interface QiniuProps extends FormComponentProps {
  submitting: boolean;
  systemAndQiniu: any;
  dispatch: Dispatch<any>;
}

class Qiniu extends Component<QiniuProps> {

  componentDidMount() {
    const { dispatch } = this.props
    dispatch({
      type: 'systemAndQiniu/getConfig'
    });
  }

  handleSubmit = (e: React.FormEvent) => {
    const { dispatch, form } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch({
          type: 'systemAndQiniu/submitRegularForm',
          payload: values,
        });
      }
    });
  };

  render() {
    const { submitting, systemAndQiniu } = this.props;
    const {
      form: { getFieldDecorator },
    } = this.props;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
        md: { span: 4 },
        lg: { span: 3 },
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
        lg: { span: 10, offset: 3 }
      },
    };
    return (
      <PageHeaderWrapper >
        <Card bordered={false}>
          <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
            <FormItem {...formItemLayout} label='accessKey'>
              {getFieldDecorator('accessKey', {
                initialValue: systemAndQiniu.fieldValue.accessKey,
                rules: [
                  {
                    required: true,
                    message: '请输入七牛云存储accessKey',
                  },
                ],
              })(<Input placeholder='请输入七牛云存储accessKey' />)}
            </FormItem>
            <FormItem {...formItemLayout} label='secretKey'>
              {getFieldDecorator('secretKey', {
                initialValue: systemAndQiniu.fieldValue.secretKey,
                rules: [
                  {
                    required: true,
                    message: '请输入七牛云存储secretKey',
                  },
                ],
              })(<Input placeholder='请输入七牛云存储secretKey' />)}
            </FormItem>

            <FormItem {...formItemLayout} label='bucket'>
              {getFieldDecorator('bucket', {
                initialValue: systemAndQiniu.fieldValue.bucket,
                rules: [
                  {
                    required: true,
                    message: '请输入七牛云存储bucket',
                  },
                ],
              })(<Input placeholder='请输入七牛云存储bucket' />)}
            </FormItem>
            <FormItem {...formItemLayout} label='空间域名'>
              {getFieldDecorator('domain', {
                initialValue: systemAndQiniu.fieldValue.domain,
                rules: [
                  {
                    required: true,
                    message: '请输入七牛云存储空间域名',
                  },
                ],
              })(<Input placeholder='请输入七牛云存储空间域名' />)}
            </FormItem>
            <FormItem {...formItemLayout} label='空间地址'>
              {getFieldDecorator('domainPath', {
                initialValue: systemAndQiniu.fieldValue.domainPath,
                rules: [
                  {
                    required: true,
                    message: '请输入七牛云存储空间地址',
                  },
                ],
              })(<Input placeholder='请输入七牛云存储空间地址' />)}
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
  systemAndQiniu: any
}

export default Form.create<QiniuProps>()(
  connect(({ loading, systemAndQiniu }: mapStateType) => ({
    submitting: loading.effects['systemAndQiniu/submitRegularForm'],
    systemAndQiniu
  }))(Qiniu),
);

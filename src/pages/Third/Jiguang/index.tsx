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

interface JiguangProps extends FormComponentProps {
  submitting: boolean;
  systemAndJiguang: any;
  dispatch: Dispatch<any>;
}

class Jiguang extends Component<JiguangProps> {

  componentDidMount() {
    const { dispatch } = this.props
    dispatch({
      type: 'systemAndJiguang/getConfig'
    });
  }

  handleSubmit = (e: React.FormEvent) => {
    const { dispatch, form } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch({
          type: 'systemAndJiguang/submitRegularForm',
          payload: values,
        });
      }
    });
  };

  render() {
    const { submitting, systemAndJiguang } = this.props;
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
            <FormItem {...formItemLayout} label='appkey'>
              {getFieldDecorator('appKey', {
                initialValue: systemAndJiguang.fieldValue.appKey,
                rules: [
                  {
                    required: true,
                    message: '请输入appkey',
                  },
                ],
              })(<Input placeholder='请输入appkey' />)}
            </FormItem>
            <FormItem {...formItemLayout} label='masterSecret'>
              {getFieldDecorator('masterSecret', {
                initialValue: systemAndJiguang.fieldValue.masterSecret,
                rules: [
                  {
                    required: true,
                    message: '请输入masterSecret',
                  },
                ],
              })(<Input placeholder='请输入masterSecret' />)}
            </FormItem>

            <FormItem {...formItemLayout} label='调用api地址'>
              {getFieldDecorator('pushUrl', {
                initialValue: systemAndJiguang.fieldValue.pushUrl,
                rules: [
                  {
                    required: true,
                    message: '请输入调用api地址',
                  },
                ],
              })(<Input placeholder='请输入调用api地址' />)}
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
  systemAndJiguang: any
}

export default Form.create<JiguangProps>()(
  connect(({ loading, systemAndJiguang }: mapStateType) => ({
    submitting: loading.effects['systemAndJiguang/submitRegularForm'],
    systemAndJiguang
  }))(Jiguang),
);

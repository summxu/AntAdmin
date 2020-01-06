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

const FormItem = Form.Item;

interface BasicProps extends FormComponentProps {
  submitting: boolean;
  systemAndBasic: any;
  dispatch: Dispatch<any>;
}

class Basic extends Component<BasicProps> {

  componentDidMount() {
    const { dispatch } = this.props
    dispatch({
      type: 'systemAndBasic/getConfig'
    });
  }

  handleSubmit = (e: React.FormEvent) => {
    const { dispatch, form } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch({
          type: 'systemAndBasic/submitRegularForm',
          payload: values,
        });
      }
    });
  };

  render() {
    const { submitting, systemAndBasic } = this.props;
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

            <FormItem {...formItemLayout} label='弹幕费用(虚拟币)'>
              {getFieldDecorator('danmu', {
                initialValue: systemAndBasic.fieldValue.danmu,
                rules: [
                  {
                    required: true,
                    message: '请输入弹幕费用(虚拟币)',
                  },
                ],
              })(<InputNumber min={1} step={1} />)}
            </FormItem>

            <Form.Item {...formItemLayout} label="是否启用家族">
              {getFieldDecorator('family', {
                valuePropName: 'checked',
                initialValue: systemAndBasic.fieldValue.family,
              })(<Switch />)}
            </Form.Item>

            <FormItem
              help="直播间用户列表刷新间隔时间（秒）"
              {...formItemLayout}
              label='刷新间隔时间'>
              {getFieldDecorator('flush', {
                initialValue: systemAndBasic.fieldValue.flush,
                rules: [
                  {
                    required: true,
                    message: '请输入直播间用户列表刷新间隔时间',
                  },
                ],
              })(<InputNumber min={1} step={1} />)}
            </FormItem>

            <FormItem {...formItemLayout} label='注册奖励(虚拟币)'>
              {getFieldDecorator('register', {
                initialValue: systemAndBasic.fieldValue.register,
                rules: [
                  {
                    required: true,
                    message: '请输入注册奖励(虚拟币)',
                  },
                ],
              })(<InputNumber min={1} step={1} />)}
            </FormItem>

            <Form.Item {...formItemLayout} label="是否启用客服">
              {getFieldDecorator('service', {
                valuePropName: 'checked',
                initialValue: systemAndBasic.fieldValue.service,
              })(<Switch />)}
            </Form.Item>

            <FormItem {...formItemLayout} label='客服链接'>
              {getFieldDecorator('url', {
                initialValue: systemAndBasic.fieldValue.url
              })(<Input
                disabled={!getFieldValue('service')}
                placeholder='请输入客服链接' />)}
            </FormItem>

            <FormItem {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button type="primary" htmlType="submit" loading={submitting}>
                提交
              </Button>

            </FormItem>
          </Form>
        </Card>
      </PageHeaderWrapper >
    );
  }
}

interface mapStateType {
  loading: {
    effects: {
      [key: string]: boolean
    }
  },
  systemAndBasic: any
}

export default Form.create<BasicProps>()(
  connect(({ loading, systemAndBasic }: mapStateType) => ({
    submitting: loading.effects['systemAndBasic/submitRegularForm'],
    systemAndBasic
  }))(Basic),
);

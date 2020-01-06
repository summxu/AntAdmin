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

interface WithdrawProps extends FormComponentProps {
  submitting: boolean;
  systemAndWithdraw: any;
  dispatch: Dispatch<any>;
}

class Withdraw extends Component<WithdrawProps> {

  componentDidMount() {
    const { dispatch } = this.props
    dispatch({
      type: 'systemAndWithdraw/getConfig'
    });
  }

  handleSubmit = (e: React.FormEvent) => {
    const { dispatch, form } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch({
          type: 'systemAndWithdraw/submitRegularForm',
          payload: values,
        });
      }
    });
  };

  render() {
    const { submitting, systemAndWithdraw } = this.props;
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


            <FormItem
              help="提现一元人民币所需虚拟币比例 10=1rmb"
              {...formItemLayout}
              label='提现比例'>
              {getFieldDecorator('ratio', {
                initialValue: systemAndWithdraw.fieldValue.ratio
              })(<InputNumber min={1} step={1} />)}
            </FormItem>

            <FormItem {...formItemLayout} label='最低提现额度(元)'>
              {getFieldDecorator('low', {
                initialValue: systemAndWithdraw.fieldValue.low
              })(<InputNumber min={0.01} step={0.01} />)}
            </FormItem>

            <FormItem {...formItemLayout} label='最高提现次数'>
              {getFieldDecorator('count', {
                initialValue: systemAndWithdraw.fieldValue.count
              })(<InputNumber min={1} step={1} />)}
            </FormItem>

            <FormItem
              help="每月提现的开始日期"
              {...formItemLayout}
              label='开始日期'>
              {getFieldDecorator('start', {
                initialValue: systemAndWithdraw.fieldValue.start
              })(<InputNumber min={1} step={1} max={31} />)}
            </FormItem>

            <FormItem
              help="每月提现的结束日期"
              {...formItemLayout}
              label='结束日期'>
              {getFieldDecorator('end', {
                initialValue: systemAndWithdraw.fieldValue.end
              })(<InputNumber min={1} step={1} max={31} />)}
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
  systemAndWithdraw: any
}

export default Form.create<WithdrawProps>()(
  connect(({ loading, systemAndWithdraw }: mapStateType) => ({
    submitting: loading.effects['systemAndWithdraw/submitRegularForm'],
    systemAndWithdraw
  }))(Withdraw),
);

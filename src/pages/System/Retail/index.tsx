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

interface RetailProps extends FormComponentProps {
  submitting: boolean;
  systemAndRetail: any;
  dispatch: Dispatch<any>;
}

class Retail extends Component<RetailProps> {

  componentDidMount() {
    const { dispatch } = this.props
    dispatch({
      type: 'systemAndRetail/getConfig'
    });
  }

  handleSubmit = (e: React.FormEvent) => {
    const { dispatch, form } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch({
          type: 'systemAndRetail/submitRegularForm',
          payload: values,
        });
      }
    });
  };

  render() {
    const { submitting, systemAndRetail } = this.props;
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

            <Form.Item {...formItemLayout} label="开启分销">
              {getFieldDecorator('power', {
                valuePropName: 'checked',
                initialValue: systemAndRetail.fieldValue.power,
              })(<Switch />)}
            </Form.Item>

            <FormItem {...formItemLayout} label='分销一级分成'>
              {getFieldDecorator('retailOne', {
                initialValue: systemAndRetail.fieldValue.retailOne
              })(<InputNumber disabled={!getFieldValue('power')} min={0.01} step={0.01} />)}
            </FormItem>

            <FormItem {...formItemLayout} label='分销二级分成'>
              {getFieldDecorator('retailTwo', {
                initialValue: systemAndRetail.fieldValue.retailTwo
              })(<InputNumber disabled={!getFieldValue('power')} min={0.01} step={0.01} />)}
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
  systemAndRetail: any
}

export default Form.create<RetailProps>()(
  connect(({ loading, systemAndRetail }: mapStateType) => ({
    submitting: loading.effects['systemAndRetail/submitRegularForm'],
    systemAndRetail
  }))(Retail),
);

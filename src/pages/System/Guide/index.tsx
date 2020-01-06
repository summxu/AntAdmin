import {
  Button,
  Card,
  Form,
  Input,
  Switch,
  InputNumber,
  Radio
} from 'antd';
import React, { Component } from 'react';
import { Dispatch } from 'redux';
import { FormComponentProps } from 'antd/es/form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import './style.less';

const FormItem = Form.Item;

interface GuideProps extends FormComponentProps {
  submitting: boolean;
  systemAndGuide: any;
  dispatch: Dispatch<any>;
}

class Guide extends Component<GuideProps> {

  componentDidMount() {
    const { dispatch } = this.props
    dispatch({
      type: 'systemAndGuide/getConfig'
    });
  }

  handleSubmit = (e: React.FormEvent) => {
    const { dispatch, form } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch({
          type: 'systemAndGuide/submitRegularForm',
          payload: values,
        });
      }
    });
  };

  render() {
    const { submitting, systemAndGuide } = this.props;
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

            <Form.Item {...formItemLayout} label="引导页开关">
              {getFieldDecorator('guidePower', {
                valuePropName: 'checked',
                initialValue: systemAndGuide.fieldValue.guidePower,
              })(<Switch />)}
            </Form.Item>

            <FormItem {...formItemLayout} label='图片展示时间'>
              {getFieldDecorator('time', {
                initialValue: systemAndGuide.fieldValue.time
              })(<InputNumber disabled={!getFieldValue('guidePower')} min={1} step={1} />)}
            </FormItem>

            <FormItem {...formItemLayout} label='展示类型'>
              {getFieldDecorator('type', {
                initialValue: systemAndGuide.fieldValue.type
              })(<Radio.Group disabled={!getFieldValue('guidePower')}>
                <Radio value={0}>图片</Radio>
                <Radio value={1}>视频</Radio>
              </Radio.Group>)}
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
  systemAndGuide: any
}

export default Form.create<GuideProps>()(
  connect(({ loading, systemAndGuide }: mapStateType) => ({
    submitting: loading.effects['systemAndGuide/submitRegularForm'],
    systemAndGuide
  }))(Guide),
);

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

interface AppVersionProps extends FormComponentProps {
  submitting: boolean;
  systemAndAppVersion: any;
  dispatch: Dispatch<any>;
}

class AppVersion extends Component<AppVersionProps> {

  componentDidMount() {
    const { dispatch } = this.props
    dispatch({
      type: 'systemAndAppVersion/getConfig'
    });
  }

  handleSubmit = (e: React.FormEvent) => {
    const { dispatch, form } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch({
          type: 'systemAndAppVersion/submitRegularForm',
          payload: values,
        });
      }
    });
  };

  render() {
    const { submitting, systemAndAppVersion } = this.props;
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

            <Form.Item {...formItemLayout} label="强制更新">
              {getFieldDecorator('mandatoryUpdate', {
                valuePropName: 'checked',
                initialValue: systemAndAppVersion.fieldValue.mandatoryUpdate,
              })(<Switch />)}
            </Form.Item>

            <FormItem {...formItemLayout} label='apk版本号'>
              {getFieldDecorator('apkVersion', {
                initialValue: systemAndAppVersion.fieldValue.apkVersion,
                rules: [
                  {
                    required: true,
                    message: '请输入apk版本号',
                  },
                ],
              })(<Input placeholder='请输入apk版本号' />)}
            </FormItem>

            <FormItem {...formItemLayout} label='apk下载链接'>
              {getFieldDecorator('apkDowload', {
                initialValue: systemAndAppVersion.fieldValue.apkDowload,
                rules: [
                  {
                    required: true,
                    message: '请输入apk下载链接',
                  },
                ],
              })(<Input placeholder='请输入apk下载链接' />)}
            </FormItem>

            <FormItem {...formItemLayout} label='apk更新说明'>
              {getFieldDecorator('apkUpdateContent', {
                initialValue: systemAndAppVersion.fieldValue.apkUpdateContent,
                rules: [
                  {
                    required: true,
                    message: '请输入apk更新说明',
                  },
                ],
              })(<TextArea
                placeholder="请输入apk更新说明"
                autoSize={{ minRows: 3, maxRows: 6 }}
              />)}
            </FormItem>

            <FormItem {...formItemLayout} label='ipa版本'>
              {getFieldDecorator('ipaVersion', {
                initialValue: systemAndAppVersion.fieldValue.ipaVersion,
                rules: [
                  {
                    required: true,
                    message: '请输入ipa版本',
                  },
                ],
              })(<Input placeholder='请输入ipa版本' />)}
            </FormItem>

            <FormItem {...formItemLayout} label='ipa上架版本'>
              {getFieldDecorator('ipaUpVersion', {
                initialValue: systemAndAppVersion.fieldValue.ipaUpVersion,
                rules: [
                  {
                    required: true,
                    message: '请输入ipa上架版本',
                  },
                ],
              })(<Input placeholder='请输入ipa上架版本' />)}
            </FormItem>

            <FormItem {...formItemLayout} label='ipa下载链接'>
              {getFieldDecorator('ipaDowload', {
                initialValue: systemAndAppVersion.fieldValue.ipaDowload,
                rules: [
                  {
                    required: true,
                    message: '请输入ipa下载链接',
                  },
                ],
              })(<Input placeholder='请输入ipa下载链接' />)}
            </FormItem>

            <FormItem {...formItemLayout} label='ipa更新说明'>
              {getFieldDecorator('ipaUpdateContent', {
                initialValue: systemAndAppVersion.fieldValue.ipaUpdateContent,
                rules: [
                  {
                    required: true,
                    message: '请输入ipa更新说明',
                  },
                ],
              })(<TextArea
                placeholder="请输入ipa更新说明"
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
  systemAndAppVersion: any
}

export default Form.create<AppVersionProps>()(
  connect(({ loading, systemAndAppVersion }: mapStateType) => ({
    submitting: loading.effects['systemAndAppVersion/submitRegularForm'],
    systemAndAppVersion
  }))(AppVersion),
);

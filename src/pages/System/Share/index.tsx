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

interface ShareProps extends FormComponentProps {
  submitting: boolean;
  systemAndShare: any;
  dispatch: Dispatch<any>;
}

class Share extends Component<ShareProps> {

  componentDidMount() {
    const { dispatch } = this.props
    dispatch({
      type: 'systemAndShare/getConfig'
    });
  }

  handleSubmit = (e: React.FormEvent) => {
    const { dispatch, form } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch({
          type: 'systemAndShare/submitRegularForm',
          payload: values,
        });
      }
    });
  };

  render() {
    const { submitting, systemAndShare } = this.props;
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

            <FormItem {...formItemLayout} label='微信推广域名'>
              {getFieldDecorator('domain', {
                initialValue: systemAndShare.fieldValue.domain,
                rules: [
                  {
                    required: true,
                    message: '请输入微信推广域名',
                  },
                ],
              })(<Input placeholder='请输入微信推广域名' />)}
            </FormItem>

            <FormItem {...formItemLayout} label='直播分享标题'>
              {getFieldDecorator('liveTitle', {
                initialValue: systemAndShare.fieldValue.liveTitle,
                rules: [
                  {
                    required: true,
                    message: '请输入直播分享标题',
                  },
                ],
              })(<Input placeholder='请输入直播分享标题' />)}
            </FormItem>

            <FormItem {...formItemLayout} label='直播分享话术'>
              {getFieldDecorator('liveContent', {
                initialValue: systemAndShare.fieldValue.liveContent,
                rules: [
                  {
                    required: true,
                    message: '请输入直播分享话术',
                  },
                ],
              })(<TextArea
                placeholder="请输入apk更新说明"
                autoSize={{ minRows: 3, maxRows: 6 }}
              />)}
            </FormItem>

            <FormItem {...formItemLayout} label='安卓app分享下载链接'>
              {getFieldDecorator('androidUrl', {
                initialValue: systemAndShare.fieldValue.androidUrl,
                rules: [
                  {
                    required: true,
                    message: '请输入安卓app分享下载链接',
                  },
                ],
              })(<Input placeholder='请输入安卓app分享下载链接' />)}
            </FormItem>

            <FormItem {...formItemLayout} label='IOSApp分享下载链接'>
              {getFieldDecorator('iosUrl', {
                initialValue: systemAndShare.fieldValue.iosUrl,
                rules: [
                  {
                    required: true,
                    message: '请输入IOSApp分享下载链接',
                  },
                ],
              })(<Input placeholder='请输入App分享下载链接' />)}
            </FormItem>

            <FormItem {...formItemLayout} label='短视频标题'>
              {getFieldDecorator('videoTitle', {
                initialValue: systemAndShare.fieldValue.videoTitle,
                rules: [
                  {
                    required: true,
                    message: '请输入短视频标题',
                  },
                ],
              })(<Input placeholder='请输入短视频标题' />)}
            </FormItem>

            <FormItem {...formItemLayout} label='短视频分享话术'>
              {getFieldDecorator('videoContent', {
                initialValue: systemAndShare.fieldValue.videoContent,
                rules: [
                  {
                    required: true,
                    message: '请输入短视频分享话术',
                  },
                ],
              })(<TextArea
                placeholder="请输入短视频分享话术"
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
  systemAndShare: any
}

export default Form.create<ShareProps>()(
  connect(({ loading, systemAndShare }: mapStateType) => ({
    submitting: loading.effects['systemAndShare/submitRegularForm'],
    systemAndShare
  }))(Share),
);

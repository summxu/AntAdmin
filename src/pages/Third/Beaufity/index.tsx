import {
  Button,
  Card,
  Form,
  Slider,
  Radio
} from 'antd';

import React, { Component } from 'react';

import { Dispatch } from 'redux';
import { FormComponentProps } from 'antd/es/form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import './style.less';

const FormItem = Form.Item;

interface BeaufityProps extends FormComponentProps {
  submitting: boolean;
  systemAndBeaufity: any;
  dispatch: Dispatch<any>;
}

class Beaufity extends Component<BeaufityProps> {

  /* 解决拖动值问题 */
  state = {
    inputValue: 1,
  };

  /* 修改redux */
  onChange = (value: any) => {
    const { dispatch } = this.props
    dispatch({
      type: 'systemAndBeaufity/saveFormConfig',
      payload: value
    })
  };

  componentDidMount() {
    const { dispatch } = this.props
    dispatch({
      type: 'systemAndBeaufity/getConfig'
    });
  }

  handleSubmit = (e: React.FormEvent) => {
    const { dispatch, form } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        dispatch({
          type: 'systemAndBeaufity/submitRegularForm',
          payload: values,
        });
      }
    });
  };

  render() {
    const { submitting, systemAndBeaufity } = this.props;
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

            <FormItem
              {...formItemLayout}
              label='滤镜程度'
              help="滤镜程度 0为无效果，1.0为默认效果">
              {getFieldDecorator('filterLevel', {
                initialValue: systemAndBeaufity.fieldValue.filterLevel
              })(<Slider min={0} max={1} step={0.1} />)}
            </FormItem>

            <FormItem
              help="美白 该参数的推荐取值范围为0~1，0为无效果，0.5为默认效果，大于1为继续增强效果"
              {...formItemLayout}
              label='美白'>
              {getFieldDecorator('colorLevel', {
                initialValue: systemAndBeaufity.fieldValue.colorLevel
              })(<Slider min={0} max={1} step={0.1} />)}
            </FormItem>

            <FormItem
              {...formItemLayout}
              help="红润 该参数的推荐取值范围为0~1，0为无效果，0.5为默认效果，大于1为继续增强效果"
              label='红润'>
              {getFieldDecorator('redLevel', {
                initialValue: systemAndBeaufity.fieldValue.redLevel
              })(<Slider min={0} max={1} step={0.1} />)}
            </FormItem>

            <FormItem
              help="磨皮程度 该参数的推荐取值范围为0.0~6.0，0.0为无效果"
              {...formItemLayout}
              label='磨皮'>
              {getFieldDecorator('blurLevel', {
                initialValue: systemAndBeaufity.fieldValue.blurLevel
              })(<Slider min={0} max={6} step={0.1} />)}
            </FormItem>

            <FormItem
              {...formItemLayout}
              label='朦胧美肤'>
              {getFieldDecorator('heavyBlur', {
                initialValue: systemAndBeaufity.fieldValue.heavyBlur
              })(<Slider min={0} max={1} step={0.1} />)}
            </FormItem>

            <FormItem
              help="亮眼程度 该参数的推荐取值范围为0～1，0为关闭该功能，0到1效果逐渐增强"
              {...formItemLayout}
              label='亮眼程度'>
              {getFieldDecorator('eyeBright', {
                initialValue: systemAndBeaufity.fieldValue.eyeBright
              })(<Slider min={0} max={1} step={0.1} />)}
            </FormItem>

            <FormItem
              help="美牙程度 该参数的推荐取值范围为0～1，0为关闭该功能，0到1效果逐渐增强"
              {...formItemLayout}
              label='美牙程度'>
              {getFieldDecorator('toothWhiten', {
                initialValue: systemAndBeaufity.fieldValue.toothWhiten
              })(<Slider min={0} max={1} step={0.1} />)}
            </FormItem>

            <FormItem {...formItemLayout} label='基本美型'>
              {getFieldDecorator('faceShape', {
                initialValue: systemAndBeaufity.fieldValue.faceShape
              })(<Radio.Group>
                <Radio value={0}>女神</Radio>
                <Radio value={1}>网红</Radio>
                <Radio value={2}>自然</Radio>
                <Radio value={3}>默认</Radio>
                <Radio value={4}>自定义</Radio>
              </Radio.Group>)}
            </FormItem>

            <FormItem {...formItemLayout} label='控制瘦脸'>
              {getFieldDecorator('cheekThinning', {
                initialValue: systemAndBeaufity.fieldValue.cheekThinning
              })(<Slider min={0} max={1} step={0.1} />)}
            </FormItem>

            <FormItem

              {...formItemLayout} label='控制大眼'>
              {getFieldDecorator('eyeEnlarging', {
                initialValue: systemAndBeaufity.fieldValue.eyeEnlarging
              })(<Slider min={0} max={1} step={0.1} />)}
            </FormItem>

            <FormItem
              help="额头调整 大于0.5 变大，小于0.5变小"
              {...formItemLayout}
              label='额头调整'>
              {getFieldDecorator('intensityForehead', {
                initialValue: systemAndBeaufity.fieldValue.intensityForehead
              })(<Slider min={0} max={1} step={0.1} />)}
            </FormItem>

            <FormItem
              help="下巴调整 大于0.5 变大，小于0.5变小"
              {...formItemLayout}
              label='下巴调整'>
              {getFieldDecorator('intensityChin', {
                initialValue: systemAndBeaufity.fieldValue.intensityChin
              })(<Slider min={0} max={1} step={0.1} />)}
            </FormItem>

            <FormItem
              help="瘦鼻 0为正常大小，大于0开始瘦鼻，范围0 - 1"
              {...formItemLayout}
              label='瘦鼻'>
              {getFieldDecorator('intensityNose', {
                initialValue: systemAndBeaufity.fieldValue.intensityNose
              })(<Slider min={0} max={1} step={0.1} />)}
            </FormItem>

            <FormItem
              help="嘴型调整 大于0.5变大，小于0.5变小"
              {...formItemLayout}
              label='嘴型调整'>
              {getFieldDecorator('intensityMouth', {
                initialValue: systemAndBeaufity.fieldValue.intensityMouth
              })(<Slider min={0} max={1} step={0.1} />)}
            </FormItem>

            <FormItem
              help="控制渐变所需要的帧数，0 渐变关闭 ，大于0开启渐变，值为渐变所需要的帧数"
              {...formItemLayout}
              label='渐变'>
              {getFieldDecorator('changeFrames', {
                initialValue: systemAndBeaufity.fieldValue.changeFrames
              })(<Slider min={0} max={1} step={0.1} />)}
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
  systemAndBeaufity: any
}

export default Form.create<BeaufityProps>()(
  connect(({ loading, systemAndBeaufity }: mapStateType) => ({
    submitting: loading.effects['systemAndBeaufity/submitRegularForm'],
    systemAndBeaufity
  }))(Beaufity),
);

import { Alert, Checkbox } from 'antd';
import React, { Component } from 'react';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import { Dispatch, AnyAction } from 'redux';
import { FormComponentProps } from 'antd/es/form';
import { connect } from 'dva';
import { StateType } from '@/models/login';
import LoginComponents from './components/Login';
import styles from './style.less';
import { LoginParamsType } from '@/services/login';
import { ConnectState } from '@/models/connect';
import AES from "@/utils/AES";

const { UserName, Password, Captcha, Submit } = LoginComponents;
interface LoginProps {
  dispatch: Dispatch<AnyAction>;
  userLogin: StateType;
  submitting: boolean;
}
interface LoginState {
  type: string;
  autoLogin: boolean;
}

@connect(({ login, loading }: ConnectState) => ({
  userLogin: login,
  submitting: loading.effects['login/login'],
}))
class Login extends Component<LoginProps, LoginState> {
  loginForm: FormComponentProps['form'] | undefined | null = undefined;

  state: LoginState = {
    type: 'account',
    autoLogin: true,
  };

  changeAutoLogin = (e: CheckboxChangeEvent) => {
    this.setState({
      autoLogin: e.target.checked,
    });
  };

  handleSubmit = (err: unknown, values: LoginParamsType) => {
    const { type } = this.state;

    /* aes加密 */
    // values.password = AES.Encrypt(values.password)

    if (!err) {
      const { dispatch } = this.props;
      dispatch({
        type: 'login/login',
        payload: values
      });
    }
  };

  onTabChange = (type: string) => {
    this.setState({
      type,
    });
  };

  renderMessage = (content: string) => (
    <Alert
      style={{
        marginBottom: 24,
      }}
      message={content}
      type="error"
      showIcon
    />
  );

  render() {
    const { userLogin, submitting } = this.props;
    const { status, message } = userLogin;
    const { type, autoLogin } = this.state;
    return (
      <div className={styles.main}>
        <LoginComponents
          defaultActiveKey={type}
          onTabChange={this.onTabChange}
          onSubmit={this.handleSubmit}
          onCreate={(form?: FormComponentProps['form']) => {
            this.loginForm = form;
          }}
        >
          {/* 本来是 tab */}
          {status === 20000 && !submitting && this.renderMessage(`${message}`)}
          <UserName
            name="username"
            placeholder={`${'请输入用户名'}`}
            rules={[
              {
                required: true,
                message: '请输入用户名!',
              },
            ]}
          />
          <Password
            name="password"
            placeholder={`${'请输入登录密码'}`}
            rules={[
              {
                required: true,
                message: '请输入密码！',
              },
            ]}
            onPressEnter={e => {
              e.preventDefault();

              if (this.loginForm) {
                this.loginForm.validateFields(this.handleSubmit);
              }
            }}
          />

          <Captcha
            name="code"
            placeholder="验证码"
            countDown={120}
            getCaptchaButtonText="获取验证码"
            getCaptchaSecondText="秒"
            rules={[
              {
                required: true,
                message: '请输入验证码！',
              },
            ]}
          />


          <div>
            <Checkbox checked={autoLogin} onChange={this.changeAutoLogin}>
              自动登录
            </Checkbox>

          </div>
          <Submit loading={submitting}>登录</Submit>

        </LoginComponents>
      </div>
    );
  }
}

export default Login;

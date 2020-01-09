/*
 * @Auth: Chenxu
 * @Date: 2019-12-10 16:14:47
 * @LastEditTime : 2020-01-09 13:35:55
 */
/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import { extend } from 'umi-request';
import { notification } from 'antd';
import qs from 'qs';
import router from 'umi/router';

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

/**
 * 异常处理程序
 */
const errorHandler = (error: { response: any, responseChenxu?: any }): Response => {
  var { response, responseChenxu } = error;
  if (responseChenxu) {
    response = responseChenxu
  }
  if (response && response.status) {
    const errorText = codeMessage[response.status] || response.statusText;
    const { status, noAlert } = response;

    if (!noAlert) {
      notification.warning({
        message: `错误代码 ${status}`,
        description: errorText
      });
    }
  } else if (!response) {
    notification.error({
      description: '您的网络发生异常，无法连接服务器',
      message: '网络异常'
    });
  }
  throw new Error(response ? (codeMessage[response.status] || response.statusText) : '网络异常');
};

/**
 * 配置request请求时的默认参数
 */
const request = extend({
  // prefix: 'http://192.168.0.12:8080',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  errorHandler, // 默认错误处理
  // getResponse: true, // 只显示data
  credentials: 'include', // 默认请求是否带上cookie
});

// 请求拦截器
request.interceptors.request.use((url, options) => {
  options.data = qs.stringify(options.data);
  return {
    options: { ...options, interceptors: true },
  };
});

// 提前对响应做异常处理
request.interceptors.response.use(async (response: Response) => {
  const data = await response.clone().json();
  if (data.status === 20000 || data.status === 200002 || data.status === 20001) {
    if (data.status === 20001) {
      /* 登录失效 */
      router.replace('/user/login');
    }
    return Promise.reject({
      responseChenxu: {
        statusText: data.message,
        status: data.status,
        noAlert: data.noAlert
      }
    });
  }

  return response;
});

export default request;
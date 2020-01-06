import { Request, Response } from 'express';

function getFakeCaptcha(req: Request, res: Response) {
  return res.json('captcha-xxx');
}
// 代码中会兼容本地 service mock 以及部署站点的静态数据
export default {
  // 支持值为 Object 和 Array
  'GET /api/currentUser': {
    name: 'Serati Ma',
    avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
    userid: '00000001',
    menu: [
      {
        path: '/welcome',
        name: '控制台',
        icon: 'dashboard',
      },
      {
        path: '/system',
        name: '系统配置',
        icon: 'dashboard',
        children: [
          {
            name: 'App版本配置',
            icon: 'android',
            path: '/system/appversion',
          },
          {
            name: '分享配置',
            icon: 'deployment-unit',
            path: '/system/share',
          },
        ],
      },
    ],
  },
  // GET POST 可省略
  'GET /api/users': [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    },
  ],
  'POST /api/login/account': (req: Request, res: Response) => {
    const { password, username, type } = req.body;
    if (password === '1' && username === 'admin') {
      res.send({
        status: 10000,
        type,
        currentAuthority: 'admin',
      });
      return;
    }
    if (password === '1' && username === 'user') {
      res.send({
        status: 10000,
        type,
        currentAuthority: 'user',
      });
      return;
    }
    res.send({
      status: 20000,
      message: '账号或密码错误',
      type,
      currentAuthority: 'guest',
      noAlert: true,
    });
  },
  'POST /api/register': (req: Request, res: Response) => {
    res.send({ status: 10000, currentAuthority: 'user' });
  },
  'GET /api/500': (req: Request, res: Response) => {
    res.status(500).send({
      timestamp: 1513932555104,
      status: 500,
      error: 'error',
      message: 'error',
      path: '/base/category/list',
    });
  },
  'GET /api/404': (req: Request, res: Response) => {
    res.status(404).send({
      timestamp: 1513932643431,
      status: 404,
      error: 'Not Found',
      message: 'No message available',
      path: '/base/category/list/2121212',
    });
  },
  'GET /api/403': (req: Request, res: Response) => {
    res.status(403).send({
      timestamp: 1513932555104,
      status: 403,
      error: 'Unauthorized',
      message: 'Unauthorized',
      path: '/base/category/list',
    });
  },
  'GET /api/401': (req: Request, res: Response) => {
    res.status(401).send({
      timestamp: 1513932555104,
      status: 401,
      error: 'Unauthorized',
      message: 'Unauthorized',
      path: '/base/category/list',
    });
  },

  'GET  /api/login/captcha': getFakeCaptcha,
};

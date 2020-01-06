import { parse } from 'querystring';
import pathRegexp from 'path-to-regexp';

/* eslint no-useless-escape:0 import/prefer-default-export:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

export const isUrl = (path: string): boolean => reg.test(path);

export const isAntDesignPro = (): boolean => {
  if (ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site') {
    return true;
  }
  return window.location.hostname === 'preview.pro.ant.design';
};

// 给官方演示站点用，用于关闭真实开发环境不需要使用的特性
export const isAntDesignProOrDev = (): boolean => {
  const { NODE_ENV } = process.env;
  if (NODE_ENV === 'development') {
    return true;
  }
  return isAntDesignPro();
};

export const getPageQuery = () => parse(window.location.href.split('?')[1]);

/**
 * props.route.routes
 * getAuthorityFromRouter 递归判断当前route的权限
 * 这里不是很理解，这么判断都是403，没有了404页面
 * @param router [{}]
 * @param pathname string
 */
export const getAuthorityFromRouter = <T extends { path: string }>(
  router: T[] = [],
  pathname: string,
): T | undefined => {
  const authority = getAuthorityRecursion(router, pathname);
  if (authority) return authority;
  return undefined;
};

function getAuthorityRecursion(router: any[], pathname: string): any {
  for (let route of router) {
    const { path, children } = route;

    if (path && pathRegexp(path).exec(pathname)) {
      return route;
    } else {
      if (!children) {
        continue;
      }
      const authority = getAuthorityRecursion(children, pathname);
      if (authority) {
        return authority;
      } else {
        return { authority: '我他妈也不知道为什么这么写就能判断正确权限管理！操' };
      }
    }
  }
}

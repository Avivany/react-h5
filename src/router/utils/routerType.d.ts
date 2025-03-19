import { RouteObject as ReactRouteObject } from 'react-router';

export type RouteObject = {
  meta?: {
    title: string; // 页面标题
    icon?: string; // 页面图标
    key?: string; // 路由标识
    permission?: string[]; // 页面权限
    [key: string]: any;
  };
} & ReactRouteObject;
// 定义应用程序中使用的共享类型

// 用户信息接口
export interface UserInfo {
  userName?: string;
  [key: string]: any;
}

// 路由元信息接口
export interface RouteMeta {
  title?: string;
  icon?: string;
  affix?: boolean;
  keepAlive?: boolean;
  [key: string]: any;
}

// 路由配置接口
export interface RouteConfig {
  path: string;
  name?: string;
  component?: any;
  meta?: RouteMeta;
  redirect?: string;
  children?: RouteConfig[];
  hidden?: boolean;
}

// 菜单数据接口
export interface MenuItem {
  id: string | number;
  parentId: string | number;
  title: string;
  path?: string;
  component?: string;
  meta?: Record<string, any>;
  children?: MenuItem[];
  [key: string]: any;
}

// 标签视图接口
export interface TagView {
  path: string;
  name?: string;
  meta?: RouteMeta;
  title?: string;
  [key: string]: any;
}

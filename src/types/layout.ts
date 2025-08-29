// 路由元信息类型扩展
export interface RouteMeta {
  title?: string;
  icon?: string;
  hideInMenu?: boolean;
  alwaysShow?: boolean;
  affix?: boolean;
}

// 路由配置类型扩展
export interface RouteConfig {
  path: string;
  name?: string;
  component?: any;
  redirect?: string;
  meta?: RouteMeta;
  children?: RouteConfig[];
  hidden?: boolean;
  noShowingChildren?: boolean;
}

// 用户信息类型
export interface UserInfo {
  userName?: string;
  mobile?: string;
  email?: string;
  avatar?: string;
  [key: string]: any;
}

// 修改密码表单数据类型
export interface PasswordFormData {
  oldPassword: string;
  password: string;
  confirmPassword: string;
}

// 个人信息表单数据类型
export interface UserInfoFormData {
  mobile: string;
  email: string;
  avatar: string;
}

// Dialog组件暴露的方法类型
export interface DialogExpose {
  openDialog: () => void;
}

// 账号相关类型定义

export interface AccountType {
  id: number;
  username: string;
  mobile: string;
  email: string;
  status: number;
  lastLoginDate: number | string;
  lastLoginProvince: string;
  lastLoginCity: string;
  createdAt: string;
  avatar?: string;
  isAdmin?: number;
}

export interface QueryFormData {
  username: string;
  mobile: string;
  email: string;
  status: number | null;
}

export interface FormData {
  username: string;
  mobile: string;
  email: string;
  status: number;
  roleIdList: number[];
  id?: number;
}

export interface RoleType {
  id: number;
  name: string;
}

export interface FormOption {
  type: string;
  label: string;
  prop: string;
  children?: () => Promise<Array<{ type: string; label: string; value: number }>>;
}

export interface TableOption {
  type?: string;
  width?: number;
  minWidth?: number;
  label: string;
  align?: string;
  prop?: string;
  slot?: string;
  render?: (item: any) => string;
  action?: boolean;
  fixed?: string;
}

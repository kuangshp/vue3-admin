// 角色相关类型定义

export interface RoleType {
  id: number;
  name: string;
  description: string;
  sort: number;
  status: number;
  createdAt: string;
  avatar?: string;
  lastLogin?: number | string;
  resourceList?: number[];
}

export interface QueryFormData {
  name: string;
  status: number | null;
}

export interface FormData {
  name: string | null;
  sort: number | null;
  description: string | null;
  status: number;
  id?: number;
  resourceList?: number[];
}

export interface ResourceNode {
  id: number;
  title: string;
  parentId: number;
  children?: ResourceNode[];
  sort?: number;
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
  action?: boolean;
  fixed?: string;
}

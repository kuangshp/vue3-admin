// 资源相关类型定义

export interface ResourceType {
  id: number;
  resourcesType: number;
  parentId: number | null;
  title: string;
  url: string | null;
  method?: string;
  icon?: string;
  uniqueKey: string;
  sort: number;
  status: number;
  description: string | null;
  isLink: number;
  isHidden: number;
  isCache: number;
  hasChildren?: boolean;
  children?: ResourceType[];
  createdAt?: string;
}

export interface QueryOptions {
  pageNumber?: number;
  pageSize?: number;
  parentId?: number;
  catalogType?: number;
}

export interface FormData {
  resourcesType: number;
  name: string | null;
  parentId: number | null;
  url: string | null;
  icon: string | null;
  sort: number;
  method: string;
  description: string | null;
  isLink: number;
  isHidden: number;
  isCache: number;
  uniqueKey: string;
  status: number;
  id?: number;
}

export interface TreeSelectItem {
  id: number;
  value: number;
  label: string;
  parentId: number;
  children?: TreeSelectItem[];
}

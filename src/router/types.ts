import type { RouteRecordRaw } from 'vue-router';

export interface RouteMeta {
  title?: string;
  icon?: string;
  hideInMenu?: boolean;
  affix?: boolean;
  linkUrl?: string;
  order?: number;
  keepAlive?: boolean;
  hidden?: boolean;
}

export interface AppRouteRecordRaw extends Omit<RouteRecordRaw, 'meta' | 'children'> {
  name: string;
  meta?: RouteMeta;
  children?: AppRouteRecordRaw[];
}

export type AppRouteModule = AppRouteRecordRaw | AppRouteRecordRaw[];

import type { AppRouteRecordRaw } from '@/router/types';
import { cloneDeep } from 'lodash';

// 定义菜单项接口
export interface MenuItem {
  url?: string;
  title?: string;
  icon?: string;
  sort?: number;
  isHidden?: number;
  children?: MenuItem[];
  meta?: {
    order?: number;
  };
}

/**
 * 格式化菜单树，将后端返回的菜单数据转换为路由配置
 * @param menusList 菜单列表
 * @returns 格式化后的路由配置列表
 */
export const formatMenusTree = (menusList: MenuItem[]): AppRouteRecordRaw[] => {
  // 排序数据
  const copyRouter = cloneDeep(menusList);
  copyRouter.sort((a, b) => {
    return (a.meta?.order || 0) - (b.meta?.order || 0);
  });
  return copyRouter.map((item) => {
    return {
      path: item.url || '',
      name: item.url || '',
      meta: {
        title: item.title,
        keepAlive: true,
        icon: item.icon,
        order: item.sort,
        hideInMenu: item.isHidden !== 1, // 根据后端条件隐藏菜单
      },
      children: item?.children?.length ? formatMenusTree(item.children) : [],
    };
  });
};

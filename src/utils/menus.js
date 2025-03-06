import { cloneDeep } from 'lodash';
export const formatMenusTree = (menusList) => {
  // 排序数据
  const copyRouter = cloneDeep(menusList);
  copyRouter.sort((a, b) => {
    return (a.meta?.order || 0) - (b.meta?.order || 0);
  });
  return copyRouter.map((item) => {
    return {
      path: item.url,
      name: item.url,
      meta: {
        title: item.title,
        keepAlive: true,
        icon: item.icon,
        order: item.sort,
        hideInMenu: item.isHidden !== 0, // 根据后端条件隐藏菜单
      },
      children:
        item?.children?.length > 0 ? formatMenusTree(item.children) : [],
    };
  });
};
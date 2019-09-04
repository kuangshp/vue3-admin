/**
 * 定义一个方法将获取的数组数据转换为树结构数据
 * @param {*} menuList 菜单数组
 */
export const getTreeList = (menuList: any[]): [string[], Array<{ [propsName: string]: any }>] => {
  if (!Array.isArray(menuList)) {
    throw new TypeError(`${menuList}不是数组`);
  }
  // 最终的路由
  const menu: Array<{ [propsName: string]: any }> = [];
  const auths: string[] = []; // 拥有哪些路由权限
  const routeMap: { [propsName: number]: any } = {};
  menuList.forEach((item) => {
    auths.push(item.url);
    item.children = [];
    routeMap[item.id] = item;
    // 如果当前parentId=-1表示根节点, 否则就是子节点要添加到父节点下面
    if (Object.is(item.parentId, -1)) {
      menu.push(item);
    } else {
      if (routeMap[item.id]) {
        routeMap[item.parentId].children.push(item);
      }
    }
  });
  return [auths, menu];
};

/**
 * 递归判断本地菜单是否有权限
 * @param authRooutes 本地路由
 * @param auths 有权限的路由
 */
export const formatList = (authRooutes: Array<{ [propsName: string]: any }>, auths: string[]): any[] => {
  if (!Array.isArray(authRooutes) || !Array.isArray(auths)) {
    throw new TypeError(`${authRooutes}和${auths}必须都是数组`);
  }

  return authRooutes.filter((route) => {
    // 判断从服务器端获取的auths是否包括本地路由中的url
    if (auths.includes(route.name)) {
      // 如果有children字段递归继续判断
      if (route.children) {
        route.children = formatList(route.children, auths);
      }
      return true;
    }
  });
};


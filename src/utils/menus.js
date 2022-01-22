import { cloneDeep } from 'lodash';
/**
 * 将菜单转换类树结构
 * @param dataList
 * @returns
 */
export const getTreeList = (oldDataList) => {
  if (!Array.isArray(oldDataList)) {
    throw new TypeError(`${oldDataList}不是数组`);
  }
  const dataList = cloneDeep(oldDataList);
  // 第一次是将全部的permissionId作为对象的key重组成一个对象
  const formatObj = dataList.reduce((pre, cur) => {
    return { ...pre, [cur['id']]: cur };
  }, {});

  const formatArray = dataList.reduce((arr, cur) => {
    const pid = cur.pid ? cur.pid : 0;
    const parent = formatObj[pid];
    if (parent) {
      parent.children ? parent.children.push(cur) : (parent.children = [cur]);
    } else {
      arr.push(cur);
    }
    return arr;
  }, []);
  return formatArray;
};

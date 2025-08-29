import { cloneDeep } from 'lodash';

/**
 * 树节点接口
 */
export interface TreeNode {
  [key: string]: any;
  children?: TreeNode[];
}

/**
 * @Author: 水痕
 * @Date: 2020-06-02 10:37:18
 * @LastEditors: 水痕
 * @Description: 定义一个方法将获取的数组数据转换为树结构数据
 * @param dataList 数组数据
 * @param primaryKey 主键字段名，默认为 'id'
 * @param parentKey 父键字段名，默认为 'pid'
 * @return 转换后的树结构数据
 */

export const getTreeList = <T extends TreeNode>(
  dataList: T[],
  primaryKey: string = 'id',
  parentKey: string = 'pid'
): T[] => {
  if (!Array.isArray(dataList)) {
    throw new TypeError(`${dataList}不是数组`);
  }

  // Create a map of all items keyed by their primaryKey
  const formatObj = dataList.reduce<Record<string, T>>((pre, cur) => {
    return { ...pre, [cur[primaryKey]]: cur };
  }, {});

  return dataList.reduce<T[]>((arr, cur) => {
    const pid = cur[parentKey] ? cur[parentKey] : 0;
    const parent = formatObj[pid];

    if (parent) {
      parent.children ? parent.children.push(cur) : (parent.children = [cur]);
    } else {
      arr.push(cur);
    }
    return arr;
  }, []);
};

/**
 * 对树结构数据进行排序
 * @param treeList 树结构数据
 * @param key 排序字段名，默认为 'sort'
 * @return 排序后的树结构数据
 */
export const sortTree = <T extends TreeNode>(treeList: T[] = [], key: string = 'sort'): T[] => {
  if (treeList.length === 0) {
    return [];
  }
  // 排序数据
  const copyTreeList = cloneDeep(treeList);
  copyTreeList.sort((a, b) => {
    return (a?.[key] || 0) - (b?.[key] || 0);
  });
  return copyTreeList.map((item) => {
    return {
      ...item,
      children: item?.children?.length ? sortTree(item.children, key) : [],
    } as T;
  });
};

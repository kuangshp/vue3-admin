/**
 * @Author: 水痕
 * @Date: 2020-06-02 10:37:18
 * @LastEditors: 水痕
 * @Description: 定义一个方法将获取的数组数据转换为树结构数据
 * @param {type}
 * @return:
 */
export const getTreeList = (dataList, primaryKey = 'id', parentKey = 'pid') => {
  if (!Array.isArray(dataList)) {
    throw new TypeError(`${dataList}不是数组`);
  }
  // 第一次是将全部的primaryKey作为对象的key重组成一个对象
  let formatObj = dataList.reduce((pre, cur) => {
    return { ...pre, [cur[primaryKey]]: cur };
  }, {});

  return dataList.reduce((arr, cur) => {
    let pid = cur[parentKey] ? cur[parentKey] : 0;
    let parent = formatObj[pid];
    if (parent) {
      parent.children ? parent.children.push(cur) : (parent.children = [cur]);
    } else {
      arr.push(cur);
    }
    return arr;
  }, []);
};

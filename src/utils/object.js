import { isObject } from './data-type';
/**
 * @Author: 水痕
 * @Date: 2020-01-24 19:38:49
 * @LastEditors: 水痕
 * @Description: 过滤对象中空的提交到后台
 * @param {type}
 * @return:
 */
export const fileObjectField = (data) => {
  if (Array.isArray(data)) {
    return data.filter(Boolean);
  } else if (isObject(data)) {
    return Object.keys(data).reduce((cur, next) => {
      if (data[next] || /^\d+$/.test(data[next])) {
        cur[next] = data[next];
      }
      return cur;
    }, {});
  } else {
    return data;
  }
}

/**
 * @Author: 水痕
 * @Date: 2020-01-27 09:47:14
 * @LastEditors: 水痕
 * @Description: 去除对象value的前后空格
 * @param {type}
 * @return:
 */
export const trimObject = (data) => {
  return Object.keys(data).reduce((cur, next) => {
    cur[next] = data[next].trim();
    return cur;
  }, {});
}


/**
 * @Author: 水痕
 * @Date: 2020-01-27 10:09:20
 * @LastEditors: 水痕
 * @Description: 处理的数据
 * @param {type}
 * @return:
 */
export const channelObject = (data) => {
  return decodeObject(fileObjectField(trimObject(data)));
}


/**
 * @Author: 水痕
 * @Date: 2020-01-27 10:22:47
 * @LastEditors: 水痕
 * @Description: 将前端使用encodeURL转义的字符转换回来
 * @param {type} 
 * @return: 
 */
export const decodeObject = (data) => {
  return Object.keys(data).reduce((cur, next) => {
    cur[next] = decodeURI(data[next]);
    return cur;
  }, {});
}

/**
 * @Author: 水痕
 * @Date: 2020-07-05 11:08:54
 * @LastEditors: 水痕
 * @Description: 序列化url地址转换为拼接字符串
 * @param {type} 
 * @return: 
 */
export const serializeObject = (data) => {
  if (!isObject(data)) {
    throw new Error(`${data}不是一个对象`);
  }
  const newData = fileObjectField(data);
  return Object.keys(newData).map(item => {
    return `${item}=${newData[item]}`;
  }).join('&');
}
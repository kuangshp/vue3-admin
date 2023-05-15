import dev from './dev';
import fat from './fat';
import uat from './uat';
import pro from './pro';

/**
 * @Author: 水痕
 * @Date: 2020-06-01 08:43:56
 * @LastEditors: 水痕
 * @Description: 根据不同的环境来读取配置的接口地址
 * @param {type} 
 * @return: 
 */
const getApi = (env) => {
  const apiObj = {
    development: dev,
    fat,
    uat,
    production: pro,
  };
  return apiObj[env];
};

export const { prefix, iamPrefix, filefix } = getApi(process.env.NODE_ENV);
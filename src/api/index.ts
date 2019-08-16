import dev from './dev';
import fat from './fat';
import uat from './uat';
import pro from './pro';

/**
 * @param {type}
 * @return:
 * @Description: 定义一个函数,根据当前的环境返回url地址
 * @Author: 水痕
 * @LastEditors: 水痕
 * @Date: 2019-08-16 09:38:58
 */
const getApi = (env: string): { [propsName: string]: string } => {
  const apiObj: { [propsName: string]: any } = {
    development: dev,
    fat,
    uat,
    production: pro,
  };
  return apiObj[env];
};

export const { prefix, iamPrefix, filefix } = getApi(process.env.NODE_ENV);

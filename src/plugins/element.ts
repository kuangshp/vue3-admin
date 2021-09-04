import { App } from 'vue';
import ElementPlus from 'element-plus';
// 单独引入一个
import { ElMessage, ElNotification, ElMessageBox } from 'element-plus';
import '../element-variables.scss';
import locale from 'element-plus/lib/locale/lang/zh-cn';
import 'dayjs/locale/zh-cn';

// $ELEMENT size属性类型
export type Size = 'default' | 'medium' | 'small' | 'mini';

interface ElementOptions {
  size: Size;
}

export default (app: App, options: ElementOptions): void => {
  // 全局注册全部的组件
  app.use(ElementPlus, { locale });
  // Vue.prototype 替换为 config.globalProperties
  // 文档说明 https://v3.cn.vuejs.org/guide/migration/global-api.html#vue-prototype-%E6%9B%BF%E6%8D%A2%E4%B8%BA-config-globalproperties
  app.config.globalProperties.$message = ElMessage;
  app.config.globalProperties.$notify = ElNotification;
  app.config.globalProperties.$confirm = ElMessageBox.confirm;
  app.config.globalProperties.$alert = ElMessageBox.alert;
  app.config.globalProperties.$prompt = ElMessageBox.prompt;

  // element-plus全局配置
  // 说明文档：https://element-plus.gitee.io/#/zh-CN/component/quickstart#quan-ju-pei-zhi
  // 该对象目前支持 size 与 zIndex 字段。size 用于改变组件的默认尺寸 small，zIndex 设置弹框的初始 z-index（默认值：2000）。
  app.config.globalProperties.$ELEMENT = {
    size: options.size,
    // zIndex: 2000 弹框zIndex默认值：2000
  };
};

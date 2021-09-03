import { App } from 'vue';
import ElementPlus from 'element-plus';
// 单独引入一个
// import { ElButton } from 'element-plus';
import '../element-variables.scss';
import locale from 'element-plus/lib/locale/lang/zh-cn';
import 'dayjs/locale/zh-cn';

export default (app: App): void => {
  // 全局注册全部的组件
  app.use(ElementPlus, { locale });
  // 全局配置大小
  app.config.globalProperties.$ELEMENT = { size: 'small' };
};

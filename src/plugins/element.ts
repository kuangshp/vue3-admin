import { App } from 'vue';
import ElementPlus from 'element-plus';
import '../element-variables.scss';
import locale from 'element-plus/lib/locale/lang/zh-cn';
import 'dayjs/locale/zh-cn';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default (app: App) => {
  app.use(ElementPlus, { locale });
};

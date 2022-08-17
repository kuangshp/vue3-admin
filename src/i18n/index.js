import { createI18n } from 'vue-i18n';
import store from '@/store';
import zhCNLocale from './lang/zh-CN';
import enLocale from './lang/en';

const message = {
  en: {
    ...enLocale,
  },
  zhCN: {
    ...zhCNLocale,
  },
};

/**
 * 返回当前 lang
 */
function getLanguage() {
  return store && store.getters && store.getters.language;
}
const i18n = createI18n({
  // 使用composition API
  legacy: false,
  // 全局使用t函数
  globalInjection: true,
  // 关闭控制台警告
  silentFallbackWarn: true,
  locale: getLanguage(),
  messages: message,
});
export default i18n;

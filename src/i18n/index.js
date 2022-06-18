import { createI18n } from 'vue-i18n';
import store from '@/store';
const message = {
  en: {
    msg: {
      test: 'hello word',
    },
  },
  zh: {
    msg: {
      test: '你好世界',
    },
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
  locale: getLanguage(),
  messages: message,
});
export default i18n;

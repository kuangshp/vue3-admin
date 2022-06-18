import { createI18n } from 'vue-i18n';
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

const locale = 'zh';

const i18n = createI18n({
  // 使用composition API
  legacy: false,
  // 全局使用t函数
  globalInjection: true,
  locale,
  messages: message,
});
export default i18n;

import { LANG } from '@/constant';
import { getItem, setItem } from '@/utils/storage';

export default {
  namespaced: true,
  state: () => ({
    // 左侧是否折叠
    sidebarOpened: true,
    // 设置国际化语言
    language: getItem(LANG) || 'zh',
  }),
  mutations: {
    triggerSidebarOpened(state) {
      state.sidebarOpened = !state.sidebarOpened;
    },
    /**
     * 设置国际化
     */
    setLanguage(state, lang) {
      setItem(LANG, lang);
      state.language = lang;
    },
  },
  actions: {},
};

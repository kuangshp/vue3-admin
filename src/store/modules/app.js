import { LANG, TAGS_VIEW } from '@/constant';
import { getItem, setItem } from '@/utils/storage';

export default {
  namespaced: true,
  state: () => ({
    // 左侧是否折叠
    sidebarOpened: true,
    // 设置国际化语言
    language: getItem(LANG) || 'zh',
    // tags数据
    tagsViewList: getItem(TAGS_VIEW) || [],
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
    /**
     * 添加 tags
     */
    addTagsViewList(state, tag) {
      const isFind = state.tagsViewList.find((item) => {
        return item.path === tag.path;
      });
      // 处理重复
      if (!isFind) {
        state.tagsViewList.push(tag);
        setItem(TAGS_VIEW, state.tagsViewList);
      }
    },
  },
  actions: {},
};

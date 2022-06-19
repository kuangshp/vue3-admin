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
    /**
     * 为指定的 tag 修改 title
     */
    changeTagsView(state, { index, tag }) {
      state.tagsViewList[index] = tag;
      setItem(TAGS_VIEW, state.tagsViewList);
    },
    /**
     * 删除 tag
     * @param {type: 'other'||'right'||'index', index: index} payload
     */
    removeTagsView(state, payload) {
      // 删除当前
      if (payload.type === 'index') {
        state.tagsViewList.splice(payload.index, 1);
        return;
      } else if (payload.type === 'other') {
        // 删除其他
        // 删除当前位置之后的所有
        state.tagsViewList.splice(payload.index + 1, state.tagsViewList.length - payload.index + 1);
        // 删除当前位置之前的所有
        state.tagsViewList.splice(1, payload.index - 1);
      } else if (payload.type === 'right') {
        // 删除右侧
        state.tagsViewList.splice(payload.index + 1, state.tagsViewList.length - payload.index + 1);
      }
      setItem(TAGS_VIEW, state.tagsViewList);
    },
  },
  actions: {},
};

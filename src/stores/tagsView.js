import { defineStore } from 'pinia';
export const useTagsViewStore = defineStore('tagView', {
  state: () => {
    return {
      visitedViews: [],
    };
  },
  getters: {},
  actions: {
    // 添加
    addView(view) {
      // 去重操作
      if (this.visitedViews.some((item) => item.path === view.path)) {
        return false;
      }
      // 处理没有设置标题的时候
      this.visitedViews.push({ ...view, title: view.meta?.title || 'tag-name' });
    },
    // 删除
    delView(view) {
      const i = this.visitedViews.indexOf(view);
      if (i > -1) {
        this.visitedViews.splice(i, 1);
      }
    },
  },
  // 数据持久化
  persist: true,
});

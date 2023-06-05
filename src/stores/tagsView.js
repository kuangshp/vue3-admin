import { defineStore } from 'pinia';
export const useTagsViewStore = defineStore('tagView', {
  state: () => {
    return {
      visitedViews: [],
      cachedViews: [], // 缓存的
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
      this.addCachedView(view); // 添加到缓存中
    },
    // 删除
    delView(view) {
      const i = this.visitedViews.indexOf(view);
      if (i > -1) {
        this.visitedViews.splice(i, 1);
      }
      this.delCachedView(view);
    },
    // 全部关闭
    delAllView() {
      this.visitedViews = this.visitedViews.filter((tag) => tag.meta.affix);
      this.cachedViews = [];
    },

    // 关闭其他
    delOthersViews(view) {
      this.visitedViews = this.visitedViews.filter(
        (tag) => tag.meta.affix || tag.path === view.path
      );
      this.cachedViews = this.cachedViews.filter((name) => name !== view.name);
    },
    // 刷新
    delCachedView(view) {
      // 删除缓存
      const index = this.cachedViews.indexOf(view.name);
      index > -1 && this.cachedViews.splice(index, 1);
    },
    // 添加到缓存中
    addCachedView(view) {
      if (this.cachedViews.includes(view.name)) return;
      if (!view.meta.noCache) {
        // 需要缓存
        this.cachedViews.push(view.name);
      }
    },
  },
  // 数据持久化
  persist: true,
});

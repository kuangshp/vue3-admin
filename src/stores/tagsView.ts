import { defineStore } from 'pinia';
import type { TagView } from '@/types';

export const useTagsViewStore = defineStore('tagView', {
  state: () => ({
    visitedViews: [] as TagView[],
    cachedViews: [] as string[], // 缓存的
  }),
  getters: {},
  actions: {
    // 添加
    addView(view: TagView): boolean {
      // 去重操作
      if (this.visitedViews.some((item: TagView) => item.path === view.path)) {
        return false;
      }
      // 处理没有设置标题的时候
      this.visitedViews.push({ ...view, title: view.meta?.title || 'tag-name' });
      this.addCachedView(view); // 添加到缓存中
      return true;
    },
    // 删除
    delView(view: TagView): void {
      const i = this.visitedViews.findIndex((item: TagView) => item.path === view.path);
      if (i > -1) {
        this.visitedViews.splice(i, 1);
      }
      this.delCachedView(view);
    },
    // 全部关闭
    delAllView(): void {
      this.visitedViews = this.visitedViews.filter((tag: TagView) => tag.meta?.affix);
      this.cachedViews = [];
    },

    // 关闭其他
    delOthersViews(view: TagView): void {
      this.visitedViews = this.visitedViews.filter(
        (tag: TagView) => tag.meta?.affix || tag.path === view.path
      );
      this.cachedViews = this.cachedViews.filter((name) => name !== view.name);
    },
    // 刷新
    delCachedView(view: TagView): void {
      // 删除缓存
      const index = this.cachedViews.indexOf(view.name || '');
      index > -1 && this.cachedViews.splice(index, 1);
    },
    // 添加到缓存中
    addCachedView(view: TagView): void {
      if (view.name && this.cachedViews.includes(view.name)) return;
      // 需要缓存
      if (view.meta?.keepAlive) {
        view.name && this.cachedViews.push(view.name);
      }
    },
  },
  // 数据持久化
  persist: true,
});

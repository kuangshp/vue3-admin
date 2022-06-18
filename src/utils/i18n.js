/*
 * @Author: xujian
 * @Date: 2021-12-21 17:45:36
 * @LastEditors: 水痕
 * @LastEditTime: 2022-06-18 19:24:11
 * @Description:将 路由中title 转化为国际化内容
 * @FilePath: /vue3-admin/src/utils/i18n.js
 */
import i18n from '@/i18n';
import { watch } from 'vue';
import store from '@/store';

export const generateTitle = (title) => {
  return i18n.global.t('route.' + title);
};

/**
 * 监听语言变化，同时执行cds
 * @param  {...any} cbs 所有的回调
 */
export function watchSwitchLang(...cbs) {
  watch(
    () => store.getters.language,
    () => {
      cbs.forEach((cb) => cb(store.getters.language));
    },
  );
}

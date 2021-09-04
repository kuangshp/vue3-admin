import { InjectionKey } from 'vue';
import { createStore, Store, useStore as baseUseStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import app, { IAppState } from '@/store/modules/app';
// import test, { ICountState } from './modules/test'
import getters from './getters';

// 模块声明在根状态下
export interface IRootState {
  app: IAppState;
  // test: ICountState;
}

// 通过下面方式使用 TypeScript 定义 store 能正确地为 store 提供类型声明。
// https://next.vuex.vuejs.org/guide/typescript-support.html#simplifying-usestore-usage
// eslint-disable-next-line symbol-description
export const key: InjectionKey<Store<IRootState>> = Symbol();

// 对于getters在组件使用时没有类型提示
// 有人提交了pr #1896 为getters创建泛型 pr通过了 还未发布
// https://github.com/vuejs/vuex/pull/1896
// 代码pr内容详情
// https://github.com/vuejs/vuex/pull/1896/files#diff-093ad82a25aee498b11febf1cdcb6546e4d223ffcb49ed69cc275ac27ce0ccce

// vuex store持久化 默认使用localstorage持久化
const persisteAppState = createPersistedState({
  storage: window.sessionStorage, // 指定storage 也可自定义
  key: 'vuex_app', // 存储名 默认都是vuex 多个模块需要指定 否则会覆盖
  // paths: ['app'] // 针对app这个模块持久化
  // 只针对app模块下sidebar.opened状态持久化
  paths: ['app.sidebar.opened'], // 通过点连接符指定state路径
});

// 针对test模块持久化
// const persisteTestState = createPersistedState({
//  storage: window.sessionStorage,
//  key: 'vuex_test',
//  paths: ['test'] // 针对test这个模块持久化
// })
export default createStore<IRootState>({
  plugins: [
    persisteAppState,
    // persisteTestState // 只是测试多模块持久化
  ],
  getters,
  modules: {
    app,
    // test // 只是测试多模块持久化
  },
});

// 定义自己的 `useStore` 组合式函数
// https://next.vuex.vuejs.org/zh/guide/typescript-support.html#%E7%AE%80%E5%8C%96-usestore-%E7%94%A8%E6%B3%95
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function useStore() {
  return baseUseStore(key);
}

// vuex持久化 vuex-persistedstate文档说明
// https://www.npmjs.com/package/vuex-persistedstate

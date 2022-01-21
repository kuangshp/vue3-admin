import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';
/********************************自动导入模块 start********************************/
const path = require('path');
const file = require.context('./modules', true, /\.js/);
let modules = {};
file.keys().forEach((key) => {
  const name = path.basename(key, '.js');
  modules[name] = file(key).default || file(key);
});
/********************************自动导入模块 end********************************/

const persistedAppState = createPersistedState({
  storage: window.sessionStorage, // 指定storage 也可自定义
  key: 'vuex_app', // 存储名 默认都是vuex 多个模块需要指定 否则会覆盖
  // paths: ['app'] // 针对app这个模块持久化
  // 只针对app模块下sidebar.opened状态持久化
  paths: [], //['app.sidebar.opened', 'tagsView.visitedViews'], // 通过点连接符指定state路径
});
export default createStore({
  plugins: [persistedAppState],
  modules,
});

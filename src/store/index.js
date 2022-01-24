import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';
import getters from './getters';

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
  // 只针对user模块下持久化,如果具体到那个state的时候可以eg:user.userInfo
  paths: ['user', 'app.tagsViewList', 'menus.menusList'],
});
export default createStore({
  plugins: [persistedAppState],
  modules,
  getters,
});

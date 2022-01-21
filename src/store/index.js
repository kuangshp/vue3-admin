import { createStore } from 'vuex';

/********************************自动导入模块 start********************************/
const path = require('path');
const file = require.context('./modules', true, /\.js/);
let modules = {};
file.keys().forEach((key) => {
  const name = path.basename(key, '.js');
  modules[name] = file(key).default || file(key);
});
/********************************自动导入模块 end********************************/

export default createStore({
  modules: {},
});

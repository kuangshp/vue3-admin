import Vue from 'vue';
import Vuex from 'vuex';
const path = require('path');

Vue.use(Vuex);

/********************************自动导包 start********************************/
const file = require.context('./modules', true, /\.js/);
const modules = {};
file.keys().forEach((key) => {
  const name = path.basename(key, '.js');
  modules[name] = file(key).default || file(key);
});
/********************************自动导包 end********************************/

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  strict: debug,
  modules: {
    ...modules,
  },
});

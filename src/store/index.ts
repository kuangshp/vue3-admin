import Vue from 'vue';
import Vuex from 'vuex';
// tslint:disable-next-line: no-var-requires
const path = require('path');

import { viewStore } from './view';
Vue.use(Vuex);

/********************************自动导包 start********************************/
const file = require.context('./modules', true, /\.ts/);
const modules: { [propsName: string]: any } = {};
file.keys().forEach((key: string) => {
  const name = path.basename(key, '.ts');
  modules[name] = file(key).default || file(key);
});
/********************************自动导包 end********************************/

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  strict: debug,
  modules: {
    viewStore,
    ...modules,
  },
});

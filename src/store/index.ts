import Vue from 'vue';
import Vuex from 'vuex';
import { viewStore } from './view';
Vue.use(Vuex);

import user from './modules/user';

export default new Vuex.Store({
  modules: {
    viewStore,
    user,
  },
});

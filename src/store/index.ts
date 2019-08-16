import Vue from 'vue';
import Vuex from 'vuex';
import { viewStore } from './view';
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    viewStore,
  },
});

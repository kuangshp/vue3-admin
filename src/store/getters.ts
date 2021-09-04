import { GetterTree } from 'vuex';
import { IRootState } from './index';

// 定义全局getters
const getters: GetterTree<IRootState, IRootState> = {
  sidebar: (state) => state.app.sidebar,
};

export default getters;

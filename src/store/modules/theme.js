import { DEFAULT_COLOR } from '@/constant';
import variables from '@/assets/styles/variables.scss';

export default {
  namespaced: true,
  state: () => ({
    mainColor: DEFAULT_COLOR,
    variables,
  }),
  mutations: {
    /**
     * 设置主题色
     */
    setMainColor(state, newColor) {
      state.mainColor = newColor;
      state.variables.menuBg = newColor;
    },
  },
  actions: {},
};

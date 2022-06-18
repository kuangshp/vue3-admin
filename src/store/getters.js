// import variables from '@/assets/styles/variables.scss';
import { generateColors, getItem } from '@/utils';
import { MAIN_COLOR } from '@/constant';
export default {
  token: (state) => state.user.token,
  userInfo: (state) => state.user.userInfo,
  cssVar: (state) => {
    return {
      ...state.theme.variables,
      ...generateColors(getItem(MAIN_COLOR)),
    };
  },
  sidebarOpened: (state) => state.app.sidebarOpened,
  language: (state) => state.app.language,
  mainColor: (state) => state.theme.mainColor,
};

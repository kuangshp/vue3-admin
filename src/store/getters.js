import variables from '@/assets/styles/variables.scss';
export default {
  token: (state) => state.user.token,
  userInfo: (state) => state.user.userInfo,
  cssVar: () => variables,
  sidebarOpened: (state) => state.app.sidebarOpened,
  language: (state) => state.app.language,
};

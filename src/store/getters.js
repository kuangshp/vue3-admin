import variables from '@/assets/styles/variables.scss';
export default {
  token: (state) => state.user.token,
  userInfo: (state) => state.user.userInfo,
  cssVar: () => variables,
};

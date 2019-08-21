import UserService from '@/servers/User';
import { axiosResult } from '@/utils';

export default {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    async getAllUserApi() {
      try {
        const { code, message, result } = await UserService.getAllUser();
        return axiosResult(result, code, message, true);
      } catch (e) {
        console.error(e);
      }
    },
  },
};

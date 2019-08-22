import UserService from '@/servers/User';
import { errorCaptured } from '@/utils';

export default {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    async getAllUserApi() {
      const [err, result] = await errorCaptured(UserService.getAllUser, true)();
      return result;
    },
  },
};

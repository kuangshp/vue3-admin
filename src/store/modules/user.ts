import UserService from '@/servers/User';
import { errorCaptured } from '@/utils';

export default {
  namespaced: true,
  state: {},
  mutations: {},
  actions: {
    async getAllUserApi() {
      return await errorCaptured(UserService.getAllUser)();
    },
  },
};

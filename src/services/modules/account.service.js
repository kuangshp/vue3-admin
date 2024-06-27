import BaseService from '../base.service';

export class AccountService extends BaseService {
  static async createApi(postData) {
    return BaseService.post('/account', postData);
  }
  static async deleteByIdApi(id) {
    return BaseService.delete(`/account/${id}`);
  }

  static async modifyByIdApi(id, data) {
    return BaseService.put(`/account/${id}`, data);
  }

  static async modifyStatusByIdApi(id) {
    return BaseService.put(`/account/status/${id}`);
  }

  static async getListApi() {
    return BaseService.get('/account/list');
  }

  static async getPageApi(queryOption) {
    return BaseService.get('/account', queryOption);
  }

  static async modifyPasswordApi(postData) {
    return BaseService.post('/account/modifyPassword', postData);
  }

  static async logoutApi() {
    return BaseService.get('/account/logout');
  }
  static async userInfoApi() {
    return BaseService.get('/account/userInfo');
  }

  static async resetPasswordApi(id) {
    return BaseService.put(`/account/resetPassword/${id}`);
  }
}

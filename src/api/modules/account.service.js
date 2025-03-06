import BaseService from '../base.service';

export class AccountService extends BaseService {
  // 创建账号
  static async createApi(postData) {
    return BaseService.post('/account', postData);
  }
  static async deleteByIdApi(id) {
    return BaseService.delete(`/account/${id}`);
  }
  // 根据id修改账号

  static async modifyByIdApi(id, data) {
    return BaseService.put(`/account/${id}`, data);
  }

  // 分页获取账号列表

  static async getPageApi(queryOption) {
    return BaseService.post('/account/page', queryOption);
  }

  // 重置密码
  static async resetPassWordApi(id) {
    return BaseService.put(`/account/resetPassword/${id}`);
  }

  // 修改密码
  static async modifyPasswordApi(data) {
    return BaseService.post('/account/modifyCurrentPassword', data);
  }
  static async modifyStatusByIdApi(id) {
    return BaseService.put(`/account/status/${id}`);
  }

  // 获取当前账号信息
  static async getCurrentAccountApi() {
    return BaseService.get('/account/userInfo');
  }

  //  自己修改自己的基本信息
  static async modifyCurrentAccountApi(data) {
    return BaseService.post('/account/modify', data);
  }
}

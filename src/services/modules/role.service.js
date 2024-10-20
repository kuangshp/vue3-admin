import BaseService from '../base.service';

export class RoleService extends BaseService {
  static async createApi(postData) {
    return BaseService.post('/role', postData);
  }
  static async deleteByIdApi(id) {
    return BaseService.delete(`/role/${id}`);
  }

  static async modifyByIdApi(id, data) {
    return BaseService.put(`/role/${id}`, data);
  }

  static async modifyStatusByIdApi(id) {
    return BaseService.put(`/role/status/${id}`);
  }

  static async getListApi() {
    return BaseService.get('/role/list');
  }

  static async getPageApi(queryOption) {
    return BaseService.get('/role', queryOption);
  }
}

import BaseService from '../base.service';

export class RoleService extends BaseService {
  static async createApi(postData) {
    return BaseService.post('/role', postData);
  }

  static async deleteByIdApi(id) {
    return BaseService.delete(`/role/${id}`);
  }

  static async modifyStatusByIdApi(id) {
    return BaseService.put(`/role/status/${id}`);
  }

  static async modifyByIdApi(id, postData) {
    return BaseService.put(`/role/${id}`, postData);
  }

  static async getPageApi(queryOption) {
    return BaseService.post('/role/page', queryOption);
  }

  static async getListApi() {
    return BaseService.get(`/role/list`);
  }
}
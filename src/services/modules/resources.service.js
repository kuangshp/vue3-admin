import BaseService from '../base.service';

export class ResourcesService extends BaseService {
  static async createApi(postData) {
    return BaseService.post('/resources', postData);
  }
  static async deleteByIdApi(id) {
    return BaseService.delete(`/resources/${id}`);
  }

  static async modifyByIdApi(id, data) {
    return BaseService.put(`/resources/${id}`, data);
  }

  static async modifyStatusByIdApi(id) {
    return BaseService.put(`/resources/status/${id}`);
  }

  static async getPageApi(queryOption) {
    return BaseService.get('/resources', queryOption);
  }

  static async getCatalogApi(queryOption) {
    return BaseService.get('/resources/catalog', queryOption);
  }

  // 获取资源树
  static async getResourcesTreeApi(queryOption) {
    return BaseService.get('/resources/tree', queryOption);
  }
}

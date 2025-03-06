import BaseService from '../base.service';

export class ResourcesService extends BaseService {
  static async createApi(postData) {
    return BaseService.post('/resources', postData);
  }

  static async deleteByIdApi(id) {
    return BaseService.delete(`/resources/${id}`);
    }
  
    static async modifyStatusByIdApi(id) {
      return BaseService.put(`/resources/status/${id}`);
    }
  
    static async modifyByIdApi(id, postData) {
      return BaseService.put(`/resources/${id}`, postData);
    }
  
    static async getPageApi(queryOption) {
      return BaseService.post('/resources/pageTree', queryOption);
    }
  
  static async getCatalogApi(queryOption) {
    return BaseService.get(`/resources/catalog`, queryOption);
    }
}
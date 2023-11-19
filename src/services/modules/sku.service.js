import BaseService from './../base.service';

export class SkuService extends BaseService {
  static async getPropertyListApi() {
    return BaseService.get('/property/list');
  }
}

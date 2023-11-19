import BaseService from './../base.service';

export class SkuService extends BaseService {
  // 查询全部的商品属性列表
  static async getPropertyListApi() {
    return BaseService.get('/property/list');
  }
  // 根据商品属性id查询具体的sku
  static async getPropertyValueByPropertyIdApi(id) {
    return BaseService.get(`/propertyValue/${id}`);
  }
  // 创建商品
  static async createSpuApi(postData) {
    return BaseService.post('/spu', postData);
  }
}



import BaseService from '../base.service';

export class RechargeChannelService extends BaseService {
  static async createApi(postData) {
    return BaseService.post('/rechargeChannel', postData);
  }
  static async deleteByIdApi(id) {
    return BaseService.delete(`/rechargeChannel/${id}`);
  }

  static async modifyByIdApi(id,data) {
    return BaseService.put(`/rechargeChannel/${id}`, data);
  }
  static async modifyStatusByIdApi(id) {
    return BaseService.put(`/rechargeChannel/status/${id}`);
  }
  // 分页获取数据
  static async getPageApi(params) {
    return BaseService.get(`/rechargeChannel/page`, params)
  }
}
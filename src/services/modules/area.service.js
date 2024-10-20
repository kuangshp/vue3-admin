import BaseService from '../base.service';

export class AreaService extends BaseService {
  static async getByPidApi(pid = 0) {
    return BaseService.get(`/area/${pid}`);
  }
}

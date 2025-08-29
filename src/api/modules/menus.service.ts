import BaseService from '../base.service';

export class MenusService extends BaseService {
  static async getMenuApi() {
    return BaseService.get('/menu');
  }
}

import BaseService from '../base.service';

export class MenusService extends BaseService {
  static async getMenusApi() {
    return BaseService.get('/menus');
  }
}

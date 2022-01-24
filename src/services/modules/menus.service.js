import BaseService from '../base.service';

export class MenusService {
  // 菜单接口
  static async menusApi() {
    return BaseService.get('/admin/menus');
  }
}

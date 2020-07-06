import BaseService from './base';

class MenuService extends BaseService{
  // 获取菜单的接口
  async getMenuList () {
    return await this.get('http://localhost:9000/api/category');
  }
}

export default new MenuService();
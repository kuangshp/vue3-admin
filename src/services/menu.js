import axios from 'axios';

class MenuService {
  // 获取菜单的接口
  async getMenuList () {
    return await axios.get('http://localhost:9000/api/category');
  }
}

export default new MenuService();
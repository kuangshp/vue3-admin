import axios from 'axios';

class MenuService {
  // 获取菜单的接口
  async getMenuList () {
    return await axios.get('http://localhost:3000/category');
  }
}

export default new MenuService();
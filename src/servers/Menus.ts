import axios from 'axios';
import menus from './../../menus';
class MenusService {
  // 登录接口
  public async menus(): Promise<any> {
    return await new Promise((resolve) => {
      resolve(menus);
    });
  }
}

export default new MenusService();

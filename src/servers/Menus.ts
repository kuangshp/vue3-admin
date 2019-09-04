import axios from 'axios';

class MenusService {
  // 登录接口
  public async menus(): Promise<any> {
    return await axios.get('https://easy-mock.com/mock/5d6f107ed12a5369fd73cfef/admin_web/api/v1/menu');
  }
}

export default new MenusService();

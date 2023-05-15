import BaseService from '../base';

class LoginService extends BaseService {
  // 登录接口
  async loginApi(postData) {
    return await this.post('/login', postData);
  }
}

export default new LoginService();

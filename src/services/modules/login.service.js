import BaseService from '../base.service';

export class LoginService {
  // 登录接口
  static async loginApi(postData) {
    return BaseService.post('/admin/login', postData);
  }
}

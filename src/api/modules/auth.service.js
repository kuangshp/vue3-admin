import BaseService from '../base.service';

export class AuthService extends BaseService {
  static async loginApi(postData) {
    return BaseService.post('/auth/login', postData);
  }

  static async logoutApi(tenant) {
    return BaseService.get('/auth/logout', { tenant });
  }
}

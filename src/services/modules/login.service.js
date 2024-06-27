import BaseService from './../base.service';

export class LoginService extends BaseService {
  static async captchaApi() {
    return BaseService.get('/captcha');
  }
  static async loginApi(postData) {
    return BaseService.post('/login', postData);
  }

  static async getTenantIdApi(tenant) {
    return BaseService.get('/getTenantId', { tenant });
  }
}

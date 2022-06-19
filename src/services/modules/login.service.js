import BaseService from './../base.service';

export class LoginService extends BaseService {
  static async loginApi(postData) {
    return BaseService.post('/admin/login', postData);
  }
}

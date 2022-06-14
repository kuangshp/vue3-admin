import request from '@/utils/request';

export class LoginService {
  static async loginApi(postData) {
    return request({
      url: '/login',
      method: 'POST',
      data: postData,
    });
  }
}

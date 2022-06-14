import request from '@/utils/request';

export class LoginService {
  static async loginApi(postData) {
    return await request({
      url: '/admin/login',
      method: 'POST',
      data: postData,
    });
  }
}

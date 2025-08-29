import type { LoginFormType } from '@/views/Login/types';
import BaseService from '../base.service';
import axios, { type ApiResponse } from '@/utils/httpRequest';

export class AuthService extends BaseService {
  static async loginApi(postData: LoginFormType) {
    return BaseService.post('/auth/login', postData);
  }

  static async logoutApi(tenant) {
    return BaseService.get('/auth/logout', { tenant });
  }

  // 获取图形验证码id
  static async getCaptchaIdApi(): Promise<ApiResponse<string>> {
    return BaseService.get('/auth/captchaId');
  }

  // 获取图形验证码
  static async getCaptchaApi(captchaId) {
    return axios.request({
      url: `/auth/captcha?captchaId=${captchaId}`,
      method: 'get',
      responseType: 'blob',
    });
  }
}

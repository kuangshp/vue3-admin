import { $post } from '@/utils';

class LoginService {
  // 登录接口
  public async login(postData: { name: string, password: string }): Promise<any> {
    return await $post('/login', postData);
  }
}

export default new LoginService();

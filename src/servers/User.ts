import { $get } from '@/utils';
class UserService {
  // 获取全部的用户
  public async getAllUser(): Promise<any> {
    return await $get('/user?pageSize=10&pageNumber=1');
  }
}

export default new UserService();

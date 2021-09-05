import BaseService from './base.service';
import { ILoginDto } from '@/dto';

export class LoginService {
  // 登录接口
  static async loginApi<ILoginVo>(postData: ILoginDto): Promise<ILoginVo> {
    return BaseService.post<ILoginVo>('/admin/login', postData);
  }
}

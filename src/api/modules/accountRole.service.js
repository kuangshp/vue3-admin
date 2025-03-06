import BaseService from '../base.service';

export class AccountRoleService extends BaseService {
  static async getAccountRoleIdListApi(accountId) {
    return BaseService.get(`/accountRole/${accountId}`);
  }
}
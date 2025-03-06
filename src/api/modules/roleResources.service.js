
import BaseService from '../base.service';

export class RoleResourcesService extends BaseService {
  static async getResourcesByRoleIdApi(roleId) {
    return BaseService.get(`/roleResources/${roleId}`);
  }
}
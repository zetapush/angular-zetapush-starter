// TODO Refactor with Lerna
import { Api, ApiError } from '../zetapush';
// TODO Refactor with Lerna
import { Group } from '../group';

export { ApiError }

export interface Check {
  id: string;
  name: string;
  has: boolean;
}
export interface Permission extends Group {}
export interface Role extends Group {}

// TODO Should be auto-generated
export class RoleApi extends Api {
  createPermission(name: string): Promise<Permission> {
    return this.$publish('createPermission', { name }).then(({ Permission }) => Permission);
  }
  getPermission(name: string): Promise<Permission> {
    return this.$publish('getPermission', { name }).then(({ Permission }) => Permission);
  }
  getPermissionList(): Promise<Array<Permission>> {
    return this.$publish('getPermissionList', { }).then(({ list }) => list);
  }
  getUserPermissionList(): Promise<Array<Permission>> {
    return this.$publish('getUserPermissionList', { }).then(({ list }) => list);
  }
  hasPermission(name: string): Promise<Check> {
    return this.$publish('hasPermission', { name });
  }

  createRole(name: string): Promise<Role> {
    return this.$publish('createRole', { name }).then(({ role }) => role);
  }
  getRole(name: string): Promise<Role> {
    return this.$publish('getRole', { name }).then(({ role }) => role);
  }
  getRoleList(): Promise<Array<Role>> {
    return this.$publish('getRoleList', { }).then(({ list }) => list);
  }
  getUserRoleList(): Promise<Array<Role>> {
    return this.$publish('getUserRoleList', { }).then(({ list }) => list);
  }
  hasRole(name: string): Promise<Check> {
    return this.$publish('hasRole', { name });
  }
}

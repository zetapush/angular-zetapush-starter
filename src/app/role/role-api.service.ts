import { Observable } from 'rxjs/Observable';
// TODO Refactor with Lerna
import { Api, ApiError } from '../zetapush';
// TODO Refactor with Lerna
import { Group } from '../group';

export { ApiError }

export interface CheckRole {
  id: string;
  name: string;
  has: boolean;
}

export interface CheckMemberRole extends CheckRole {
  member: string;
}

export interface Role extends Group {}

// TODO Should be auto-generated
export class RoleApi extends Api {
  onAddRoleMember: Observable<CheckMemberRole>;
  onRemoveRoleMember: Observable<CheckMemberRole>;

  createRole(name: string): Promise<Role> {
    return this.$publish('createRole', { name }).then(({ role }) => role);
  }
  getRole(name: string): Promise<Role> {
    return this.$publish('getRole', { name }).then(({ role }) => role);
  }
  getRoleList(): Promise<Array<Role>> {
    return this.$publish('getRoleList', { }).then(({ list }) => list);
  }
  addRoleMember({ id, name, member }: { id: string, name: string, member: string }) {
    return this.$publish('setRoleListMember', { id, name, member });
  }
  removeRoleMember({ id, name, member }: { id: string, name: string, member: string }) {
    return this.$publish('removeRoleMember', { id, name, member });
  }
  getUserRoleList(userKey?: string): Promise<Array<Role>> {
    return this.$publish('getUserRoleList', { userKey }).then(({ list }) => list);
  }
  hasRole(name: string): Promise<CheckRole> {
    return this.$publish('hasRole', { name });
  }
}

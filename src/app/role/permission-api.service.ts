import { Observable } from 'rxjs/Observable';
// TODO Refactor with Lerna
import { Api, ApiError } from '../zetapush';
// TODO Refactor with Lerna
import { Group } from '../group';

export { ApiError }

export interface CheckPermission {
  id: string;
  name?: string;
  has: boolean;
}

export interface CheckMemberPermission extends CheckPermission {
  member: string;
}

export interface Permission extends Group {}

// TODO Should be auto-generated
export class PermissionApi extends Api {
  onAddPermissionMember: Observable<CheckMemberPermission>;
  onRemovePermissionMember: Observable<CheckMemberPermission>;

  createPermission(name: string): Promise<Permission> {
    return this.$publish('createPermission', { name }).then(({ Permission }) => Permission);
  }
  getPermission(name: string): Promise<Permission> {
    return this.$publish('getPermission', { name }).then(({ Permission }) => Permission);
  }
  getPermissionList(): Promise<Array<Permission>> {
    return this.$publish('getPermissionList', { }).then(({ list }) => list);
  }
  addPermissionMember({ id, name, member }: { id: string, name: string, member: string }) {
    return this.$publish('addPermissionMember', { id, name, member });
  }
  removePermissionMember({ id, name, member }: { id: string, name: string, member: string }) {
    return this.$publish('removePermissionMember', { id, name, member });
  }
  getUserPermissionList(userKey?: string): Promise<Array<Permission>> {
    return this.$publish('getUserPermissionList', { userKey }).then(({ list }) => list);
  }
  hasPermission(name: string): Promise<CheckPermission> {
    return this.$publish('hasPermission', { name });
  }
  setPermissionListMember({ member, permissions }: { member: string, permissions: any }) {
    return this.$publish('setPermissionListMember', { member, permissions });
  }
}

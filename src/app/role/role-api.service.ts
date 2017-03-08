// TODO Refactor with Lerna
import { Api } from '../zetapush';
// TODO Refactor with Lerna
import { Group } from '../group';

export interface Role extends Group {}

// TODO Should be auto-generated
export class RoleApi extends Api {
  createRole({ name }: { name: string }): Promise<Role> {
    return this.$publish('createRole', { name }).then(({ role }) => role);
  }
  getRole({ name }: { name: string }): Promise<Role> {
    return this.$publish('getRole', { name }).then(({ role }) => role);
  }
  listRole(): Promise<Array<Role>> {
    return this.$publish('listRole', { }).then(({ roles }) => roles);
  }
  listUserRole(): Promise<Array<Role>> {
    return this.$publish('listUserRole', { }).then(({ roles }) => roles);
  }
}

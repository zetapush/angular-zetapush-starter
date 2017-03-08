// TODO Refactor with Lerna
import { Api } from '../zetapush';
// TODO Refactor with Lerna
import { Group } from '../group';

export interface Role {
  id: string;
  name: string;
  role: Group;
}

export class RoleApi extends Api {
  createRole({ name }: { name: string }): Promise<Role> {
    return this.$publish('createRole', { name }).then(({ id, role }) => ({ id, name, role }));
  }
  getRole({ name }: { name: string }): Promise<Role> {
    return this.$publish('getRole', { name }).then(({ id, role }) => ({ id, name, role }));
  }
  listRole(): Promise<Array<Role>> {
    return this.$publish('listRole', { }).then(({ roles }) => roles);
  }
  listUserRole(): Promise<Array<Role>> {
    return this.$publish('listUserRole', { }).then(({ roles }) => roles);
  }
}

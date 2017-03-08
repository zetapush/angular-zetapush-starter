// TODO Refactor with Lerna
import { Api } from '../zetapush';

export interface Metadata {
  [key: string]: any;
}

export interface Group {
  id: string;
  deploymentId: string;
  name: string;
  owner: string;
  resource: string;
  members: Array<any>;
  metadata: Metadata;
  tags: Array<string>;
}

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

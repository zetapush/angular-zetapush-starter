// TODO Refactor with Lerna
import { Api } from '../zetapush';

export type Tags = Array<string>;

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
  tags: Tags;
}


interface ApiGroup {
  id: string;
}

interface ApiGroupMember {
  id: string;
  member: string;
}

interface ApiCreateGroup extends ApiGroup {
  name: string;
  members: Array<string>;
  metadata: Metadata;
  tags: Tags;
}

// TODO Should be auto-generated
export class GroupApi extends Api {

  addGroupMember({ id, member }: ApiGroupMember): Promise<ApiGroupMember> {
    return this.$publish('addGroupMember', { id, member });
  }

  removeGroupMember({ id, member }: ApiGroupMember): Promise<ApiGroupMember> {
    return this.$publish('removeGroupMember', { id, member });
  }

  createGroup({ id, name, members, metadata, tags }: ApiCreateGroup): Promise<Group> {
    return this.$publish('createGroup', { id, name, members, metadata, tags }).then(({ group }) => group);
  }

  deleteGroup({ id }: ApiGroup): Promise<ApiGroup> {
    return this.$publish('deleteGroup', { });
  }

  getGroup({ id }: ApiGroup): Promise<Group> {
    return this.$publish('getGroup', { }).then(({ group }) => group);
  }

  listGroup(): Promise<Array<Group>> {
    return this.$publish('listGroup', { }).then(({ groups }) => groups);
  }

  listUserGroup(): Promise<Array<Group>> {
    return this.$publish('listUserGroup', { }).then(({ groups }) => groups);
  }

}

import { NgZone } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Api, ZetaPushClient, createApi } from 'zetapush-angular';

// TODO Refactor with Lerna
import { Metadata, Tags } from '../core';
// TODO Refactor with Lerna
import { User } from '../user';

export interface Group {
  id: string;
  deploymentId: string;
  name: string;
  owner: string;
  resource: string;
  members: Array<User>;
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
  members: Array<User>;
  metadata: Metadata;
  tags: Tags;
}

// TODO Should be auto-generated
export class GroupApi extends Api {
  onAddGroupMember: Observable<ApiGroupMember>;

  addGroupMember({ id, member }: ApiGroupMember): Promise<ApiGroupMember> {
    return this.$publish('addGroupMember', { id, member });
  }

  removeGroupMember({ id, member }: ApiGroupMember): Promise<ApiGroupMember> {
    return this.$publish('removeGroupMember', { id, member });
  }

  createGroup({
    id,
    name,
    members,
    metadata,
    tags,
  }: ApiCreateGroup): Promise<Group> {
    return this.$publish('createGroup', {
      id,
      name,
      members,
      metadata,
      tags,
    }).then(({ group }) => group);
  }

  deleteGroup({ id }: ApiGroup): Promise<ApiGroup> {
    return this.$publish('deleteGroup', { id });
  }

  getGroup({ id }: ApiGroup): Promise<Group> {
    return this.$publish('getGroup', { id }).then(({ group }) => group);
  }

  getGroupList(): Promise<Array<Group>> {
    return this.$publish('getGroupList', {}).then(({ list }) => list);
  }

  getUserGroupList(): Promise<Array<Group>> {
    return this.$publish('getUserGroupList', {}).then(({ list }) => list);
  }
}

export function GroupApiFactory(
  client: ZetaPushClient,
  zone: NgZone,
): GroupApi {
  return createApi(client, zone, GroupApi) as GroupApi;
}

export const GroupApiProvider = {
  provide: GroupApi,
  useFactory: GroupApiFactory,
  deps: [ZetaPushClient, NgZone],
};

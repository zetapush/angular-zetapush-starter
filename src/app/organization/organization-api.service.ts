import { Api } from 'zetapush-angular';

// TODO Refactor with Lerna
import { Group } from '../group';
// TODO Refactor with Lerna
import { User } from '../user';

export interface Organization extends Group {}

// TODO Should be auto-generated
export class OrganizationApi extends Api {
  getUserContactList(): Promise<Array<User>> {
    return this.$publish('getUserContactList', { }).then(({ list }) => list);
  }
  createOrganization({ name }: { name: string }): Promise<Organization> {
    return this.$publish('createOrganization', { name }).then(({ organization }) => organization);
  }
  getOrganization({ id, name }: { id?: string, name?: string }): Promise<Organization> {
    return this.$publish('getOrganization', { name }).then(({ organization }) => organization);
  }
  getOrganizationList(): Promise<Array<Organization>> {
    return this.$publish('getOrganizationList', { }).then(({ list }) => list);
  }
  getUserOrganizationList(): Promise<Array<Organization>> {
    return this.$publish('getUserOrganizationList', { }).then(({ list }) => list);
  }
}

// TODO Refactor with Lerna
import { Api } from '../zetapush';
// TODO Refactor with Lerna
import { Group } from '../group';

export interface Organization extends Group {}

// TODO Should be auto-generated
export class OrganizationApi extends Api {
  createOrganization({ name }: { name: string }): Promise<Organization> {
    return this.$publish('createOrganization', { name }).then(({ organization }) => organization);
  }
  getOrganization({ id, name }: { id: string, name: string }): Promise<Organization> {
    return this.$publish('getOrganization', { name }).then(({ organization }) => organization);
  }
  getOrganizationList(): Promise<Array<Organization>> {
    return this.$publish('getOrganizationList', { }).then(({ list }) => list);
  }
  getUserOrganizationList(): Promise<Array<Organization>> {
    return this.$publish('getUserOrganizationList', { }).then(({ list }) => list);
  }
}

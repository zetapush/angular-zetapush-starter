import { Component } from '@angular/core';

import { ReplaySubject } from 'rxjs/ReplaySubject';

// TODO Refactor with Lerna
import { ViewActionComponent } from '../../core';
// TODO Refactor with Lerna
import { Group, GroupApi } from '../../group';
// TODO Refactor with Lerna
import { User } from '../../user';

@Component({
  selector: 'zp-add-group-member-view-action',
  template: `
    <zp-autocomplete-organization-members-dialog (select)="onSelectUser($event)"></zp-autocomplete-organization-members-dialog>
  `,
  styles: [`

  `]
})
export class AddGroupMemberViewActionComponent implements ViewActionComponent {

  context: ReplaySubject<any>;
  parameters: any;
  group: Group;

  constructor(private api: GroupApi) {
    console.log('AutocompleteOrganizationMemberViewActionComponent::constructor');
  }

  onContextInjected(context: ReplaySubject<Group>) {
    console.log('AutocompleteOrganizationMemberViewActionComponent::onContextInjected', context);
    this.context = context;
    this.context.subscribe((group) => {
      console.log('AutocompleteOrganizationMemberViewActionComponent::onGetContext', group);
      this.group = group;
    });
  }

  onSelectUser(user: User) {
    console.log('AutocompleteOrganizationMemberViewActionComponent::onSelectUser', user);
    if (this.group && user) {
      this.api.addGroupMember({
        id: this.group.id,
        member: user.userKey
      }).then((message) => {
        console.log('AutocompleteOrganizationMemberViewActionComponent::onAddGroupMember', message);
      }, (errors) => {
        console.error('AutocompleteOrganizationMemberViewActionComponent::onAddGroupMember', errors);
      });
    }
  }

}

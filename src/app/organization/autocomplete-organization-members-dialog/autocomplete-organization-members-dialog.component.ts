import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Observable } from 'rxjs/Observable';

// TODO Refactor with Lerna
import { DialogUserListComponent, User } from '../../user';
// TODO Refactor with Lerna
import { MdDialog } from '../../ui';

import { Organization, OrganizationApi } from '../';

@Component({
  selector: 'zp-autocomplete-organization-members-dialog',
  template: `
    <button md-icon-button color="primary" (click)="open()"><md-icon>add</md-icon></button>
  `,
  styles: [
    `
  `,
  ],
})
export class AutocompleteOrganizationMembersDialogComponent {
  users: Observable<Array<User>>;

  @Input() organization: string;

  @Output() select = new EventEmitter<User>();

  constructor(private api: OrganizationApi, public dialog: MdDialog) {
    this.users = Observable.of([]);
  }

  open() {
    console.log('AutocompleteOrganizationMembersDialogComponent::open');

    this.api.getUserOrganizationList().then(
      (list: Array<Organization>) => {
        const users: Array<User> = [];
        list.forEach((organization: Organization) => {
          organization.members.forEach(member => {
            if (!users.find(user => user.userKey === member.userKey)) {
              users.push(member);
            }
          });
        });
        this.users = Observable.of(users);

        const reference = this.dialog.open(DialogUserListComponent, {
          data: {
            users: this.users,
          },
        });

        reference.afterClosed().subscribe(value => {
          console.log(
            'AutocompleteOrganizationMembersDialogComponent::afterClosed',
            value,
          );
          if (value) {
            this.select.emit(value);
          }
        });
      },
      errors => {
        console.error('getUserOrganizationList', errors);
      },
    );
  }
}

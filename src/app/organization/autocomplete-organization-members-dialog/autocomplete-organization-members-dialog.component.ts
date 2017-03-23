import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';

import { Observable } from 'rxjs/Observable';

// TODO Refactor with Lerna
import { DialogUserListComponent, User } from '../../user';

import { Organization, OrganizationApi } from '../';

@Component({
  selector: 'zp-autocomplete-organization-members-dialog',
  template: `
    <button md-icon-button color="primary" (click)="open()"><md-icon>add</md-icon></button>
  `,
  styles: [`
  `]
})
export class AutocompleteOrganizationMembersDialogComponent implements OnInit {

  users: Observable<Array<User>>;

  @Input() organization: string;

  @Output() select = new EventEmitter<User>();

  constructor(private api: OrganizationApi, public dialog: MdDialog) {
    this.users = Observable.of([]);
  }

  ngOnInit() { }

  open() {
    console.log('AutocompleteOrganizationMembersDialogComponent::open');

    this.api.getUserOrganizationList().then((list: Array<Organization>) => {
      const users: Array<User> = [];
      list.forEach((organization: Organization) => {
        organization.members.forEach((member) => {
          if (!users.find((user) => user.userKey === member.userKey)) {
            users.push(member);
          }
        });
      });
      this.users = Observable.of(users);

      const reference = this.dialog.open(DialogUserListComponent, {
        data: {
          users: this.users
        }
      });

      reference.afterClosed().subscribe((value) => {
        console.log('AutocompleteOrganizationMembersDialogComponent::afterClosed', value);
        this.select.emit(value);
      });
    }, (errors) => {
      console.error('getUserOrganizationList', errors);
    });
  }

}

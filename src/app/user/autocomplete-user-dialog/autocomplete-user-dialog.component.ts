import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MdDialog, MdDialogRef } from '@angular/material';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/startWith';

interface User {
  login: string;
  userKey: string;
}

@Component({
  selector: 'zp-dialog-user-list',
  template: `
    <md-input-container>
      <input mdInput placeholder="User" [mdAutocomplete]="search" [formControl]="user">
    </md-input-container>

    <md-autocomplete #search="mdAutocomplete" [displayWith]="display">
      <md-option *ngFor="let user of filtered | async" [value]="user">
        {{ user.login }}
      </md-option>
    </md-autocomplete>
  `,
  styles: [`

  `]
})
export class DialogUserListComponent {
  user = new FormControl();
  users: Array<User> = [
    { login: 'ghoullier', userKey: 'GH' },
    { login: 'jcmichel', userKey: 'JC' },
    { login: 'mmorvan', userKey: 'MM' },
    { login: 'pabreu', userKey: 'PA' },
    { login: 'rmillet', userKey: 'RM' }
  ];
  filtered: Observable<Array<User>>;

  constructor(private dialog: MdDialogRef<User>) {
    console.log('DialogUserListComponent::constructor', dialog);
    this.filtered = this.user.valueChanges
        .startWith(null)
        .map((user) => user && typeof user === 'object' ? user.login : user)
        .map((name) => name ? this.filter(name) : this.users.slice());

    this.user.valueChanges.subscribe((user) => {
      console.log('DialogUserListComponent::onChangeUser', user);
      if (user && typeof user === 'object') {
        this.dialog.close(user);
      }
    });
  }

  filter(value: string): Array<User> {
    console.log('DialogUserListComponent::filter', value);
    return this.users.filter((user) => new RegExp(value, 'gi').test(user.login));
  }

  display(user: User): string {
    console.log('DialogUserListComponent::display', user);
    return user ? user.login : '';
  }

}

@Component({
  selector: 'zp-autocomplete-user-dialog',
  templateUrl: './autocomplete-user-dialog.component.html',
  styles: [`
  `]
})
export class AutocompleteUserDialogComponent implements OnInit {

  @Input() title = 'Add member';

  constructor(public dialog: MdDialog) { }

  ngOnInit() {
  }

  open() {
    const ref = this.dialog.open(DialogUserListComponent);

    ref.afterClosed().subscribe((value) => {
      console.log('AutocompleteUserDialogComponent::afterClosed', value);
    });
  }

}

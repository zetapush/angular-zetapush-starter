import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/scan';

// TODO Refactor with lerna
import { MdDialog, MdDialogRef } from '../../ui';

import { User } from '../user-api.service';

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
  users: Observable<Array<User>>;
  filtered: Observable<Array<User>>;

  constructor(private dialog: MdDialogRef<User>) {
    console.log('DialogUserListComponent::constructor', dialog);

    const { dialogConfig } = dialog._containerInstance;

    if (dialogConfig.data.users) {
      this.users = dialogConfig.data.users as Observable<Array<User>>;
    } else {
      this.users = Observable.of([]);
    }

    this.filtered = this.user.valueChanges
        .startWith(null)
        .map((user) => user && typeof user === 'object' ? user.login : user)
        .switchMap((name) => name ? this.filter(name) : this.users);

    this.user.valueChanges.subscribe((user) => {
      console.log('DialogUserListComponent::onChangeUser', user);
      if (user && typeof user === 'object') {
        this.dialog.close(user);
      }
    });
  }

  filter(value: string): Observable<Array<User>> {
    console.log('DialogUserListComponent::filter', value);
    return this.users.scan((filtered, users) => {
      return users.filter((user) => new RegExp(value, 'gi').test(user.login));
    }, []);
  }

  display(user: User): string {
    console.log('DialogUserListComponent::display', user);
    return user ? user.login : '';
  }

}

@Component({
  selector: 'zp-autocomplete-user-dialog',
  template: `
    <button md-icon-button color="primary" (click)="open()"><md-icon>add</md-icon></button>
  `,
  styles: [`
  `]
})
export class AutocompleteUserDialogComponent {

  @Input() title = 'Add member';
  @Input() users: Observable<Array<User>>;

  @Output() select = new EventEmitter<User>();

  constructor(public dialog: MdDialog) { }

  open() {
    console.log('AutocompleteUserDialogComponent::open');

    const reference = this.dialog.open(DialogUserListComponent, {
      data: {
        users: this.users
      }
    });

    reference.afterClosed().subscribe((value) => {
      console.log('AutocompleteUserDialogComponent::afterClosed', value);
      this.select.emit(value);
    });
  }

}

import { MdDialogConfig, MdDialogContainer, OverlayRef } from '@angular/material';

class FixMdDialogRef<T> extends MdDialogRef<T> {
  constructor(_overlayRef: OverlayRef, _containerInstance: MdDialogContainer, public config: MdDialogConfig) {
    super(_overlayRef, _containerInstance);
  }
}

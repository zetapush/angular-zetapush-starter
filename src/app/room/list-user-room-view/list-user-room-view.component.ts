import { Component, OnDestroy, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

// TODO Refactor with Lerna
import { User } from '../../user';

import { Room, RoomApi } from '../room-api.service';

@Component({
  selector: 'zp-list-user-room-view',
  template: `
    <h1>list-user-room-view</h1>
    <mat-list>
      <mat-list-item *ngFor="let room of list">
        <zp-room-link [room]="room"></zp-room-link>
      </mat-list-item>
    </mat-list>
    <zp-autocomplete-organization-members-dialog (select)="onSelectUser($event)"></zp-autocomplete-organization-members-dialog>
  `,
  styles: [
    `

  `,
  ],
})
export class ListUserRoomViewComponent implements OnDestroy, OnInit {
  users: Observable<Array<User>>;
  list: Array<Room> = [];
  private subscriptions: Array<Subscription> = [];

  constructor(private api: RoomApi) {
    this.subscriptions.push(
      api.onCreateRoom.subscribe(room => {
        console.log('onCreateRoom', room);
        this.list.push(room);
      }),
    );
    this.subscriptions.push(
      api.onCreateOneToOneRoom.subscribe(room => {
        console.log('onCreateOneToOneRoom', room);
        this.list.push(room);
      }),
    );
  }

  ngOnDestroy() {
    // Remove subscription
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }

  ngOnInit() {
    this.getUserRoomList();
  }

  private getUserRoomList() {
    this.api.getUserRoomList({}).then(
      list => {
        console.log(
          'ListUserGroupViewComponent::onGetUserRoomList',
          list,
        );
        this.list = list;
      },
      errors => {
        console.error(
          'ListUserGroupViewComponent::onGetUserRoomList',
          errors,
        );
      },
    );
  }

  onSelectUser(user: User) {
    console.log('ListUserRoomViewComponent::onSelectUser', user);
    this.api
      .createOneToOneRoom({
        interlocutor: user.userKey,
      })
      .then(
        (room: Room) => {
          console.log(
            'ListUserGroupViewComponent::onCreateOneToOneRoom',
            room,
          );
          this.getUserRoomList();
        },
        errors => {
          console.error(
            'ListUserGroupViewComponent::onCreateOneToOneRoom',
            errors,
          );
        },
      );
  }
}

import { Component, OnInit } from '@angular/core';

import { Group, GroupApi } from '../';

@Component({
  selector: 'zp-list-user-group-view',
  templateUrl: './list-user-group-view.component.html',
  styles: []
})
export class ListUserGroupViewComponent implements OnInit {

  list: Array<Group> = [];

  constructor(private api: GroupApi) {}

  ngOnInit() {
    this.getUserGroupList();
  }

  private getUserGroupList() {
    this.api.getUserGroupList().then((list) => {
      console.log('ListUserGroupViewComponent::getGroupList', list);
      this.list = list;
    }, (errors) => {
      console.error('ListUserGroupViewComponent::getGroupList', errors);
    });
  }

}

import { Component, OnInit } from '@angular/core';

import { Group, GroupApi } from '../';

@Component({
  selector: 'zp-list-user-group-view',
  templateUrl: './list-user-group-view.component.html',
  styles: [`
     .listAvatar{
       width:45px;
       height:45px;
       border-radius:40px;
       margin:8px 10px 0 0;
     }

    md-card-title a{
    color:#13213c;
    text-transform:uppercase;
    text-decoration:none;
    font-weight:400;
    font-size:12pt;
  }

  .mat-card:not([class*=mat-elevation-z]):hover{
   background-color:#EDEDED;
  }

  .mat-card:not([class*=mat-elevation-z]){
    box-shadow:none;
  }

   md-card:after{
      content:'';
      width:60px;
      height:2px;
      background:#11213b;
      position:absolute;
      bottom:0;
    }

  .mdc-list-item__start-detail{
    margin-right:15px;
  }

  .material-icons{
    color:#11213b;
  }

  #IconGroup{
    font-size:35px;
  }

  #menu{
    margin-left:30px;
  }

  #newGroup{
    padding-left:185px;
  }

  #newGroup:hover{
        background:#EDEDED;
      }
  `]
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

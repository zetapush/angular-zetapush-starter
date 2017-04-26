import { Component, OnInit } from '@angular/core';

import { Organization, OrganizationApi } from '../';

@Component({
  selector: 'zp-list-organization-view',
  templateUrl: './list-organization-view.component.html',
  styles: [`
  .mat-card:not([class*=mat-elevation-z]):hover{
   background-color:#F4F4F2;
  }

  .mat-card:not([class*=mat-elevation-z]){
    box-shadow:none;
  }

  .mat-card-content{
    font-size:13px;
  }

  md-card:after{
      content:'';
      width:60px;
      height:2px;
      background:#11213b;
      position:absolute;
      bottom:0;
    }

  .mat-card-avatar{
    height:50px;
    width:60px;
  }

  md-card-title a{
    color:#13213c;
    text-transform:uppercase;
    text-decoration:none;
    font-weight:400;
    font-size:12pt;
  }

  .mdc-list-item__start-detail{
    margin-right:15px;
  }
  `]
})
export class ListOrganizationViewComponent implements OnInit {

  list: Array<Organization> = [];

  constructor(private api: OrganizationApi) {}

  ngOnInit() {
    this.getOrganizationList();
  }

  private getOrganizationList() {
    this.api.getOrganizationList().then((list) => {
      console.log('ListOrganizationViewComponent::getOrganizationList', list);
      this.list = list;
    }, (errors) => {
      console.error('ListOrganizationViewComponent::getOrganizationList', errors);
    });
  }

}

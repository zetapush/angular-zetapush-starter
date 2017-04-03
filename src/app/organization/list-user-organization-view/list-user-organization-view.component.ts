import { Component, OnInit } from '@angular/core';

import { Organization, OrganizationApi } from '../';

@Component({
  selector: 'zp-list-user-organization-view',
  templateUrl: './list-user-organization-view.component.html',
  styles: [`

  `]
})
export class ListUserOrganizationViewComponent implements OnInit {

  list: Array<Organization> = [];

  constructor(private api: OrganizationApi) {}

  ngOnInit() {
    this.getUserOrganizationList();
  }

  private getUserOrganizationList() {
    this.api.getUserOrganizationList().then((list) => {
      console.log('ListUserOrganizationViewComponent::getUserOrganizationList', list);
      this.list = list;
    }, (errors) => {
      console.error('ListUserOrganizationViewComponent::getUserOrganizationList', errors);
    });
  }

}

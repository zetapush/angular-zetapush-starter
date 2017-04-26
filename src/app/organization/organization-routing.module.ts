import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// TODO Refactor with Lerna
import { IsSimplyConnected, CoreState, ViewActionItem, ViewActionRegistry } from '../core';
// TODO Refactor with Lerna
import { RouterLayoutComponent } from '../router';
// TODO Refactor with Lerna
import { DetailsGroupViewComponent } from '../group';

import { ListOrganizationViewComponent } from './list-organization-view/list-organization-view.component';
import { ListUserOrganizationViewComponent } from './list-user-organization-view/list-user-organization-view.component';
import { DetailsOrganizationViewComponent } from './details-organization-view/details-organization-view.component';
import {
  AddGroupMemberViewActionComponent
} from './add-group-member-view-action/add-group-member-view-action.component';

const routes: Routes = [{
  path: 'organization',
  component: RouterLayoutComponent,
  canActivate: [ IsSimplyConnected ],
  data: {
    links: [
      { path: 'list/all', name: 'organization/list/all' },
      { path: 'list/mine', name: 'organization/list/mine' },
    ]
  },
  children: [
    { path: '', redirectTo: 'list/mine', pathMatch: 'full' },
    { path: 'list/all', component: ListOrganizationViewComponent },
    { path: 'list/mine', component: ListUserOrganizationViewComponent },
    { path: 'details/:name', component: DetailsOrganizationViewComponent }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class OrganizationRoutingModule {
  constructor(core: CoreState, registry: ViewActionRegistry) {
    console.log('OrganizationRoutingModule::constructor', core);
    core.register({
      name: 'organization',
      path: '/organization'
    });
    registry.setActionsByView(DetailsGroupViewComponent, [
      new ViewActionItem(AddGroupMemberViewActionComponent, {
        yo: 'bitch'
      })
    ]);
  }
}

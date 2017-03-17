import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IsSimplyConnected, CoreState } from '../core';

import { OrganizationLayoutComponent } from './organization-layout/organization-layout.component';
import { ListOrganizationViewComponent } from './list-organization-view/list-organization-view.component';
import { DetailsOrganizationViewComponent } from './details-organization-view/details-organization-view.component';

const routes: Routes = [{
  path: 'organization',
  component: OrganizationLayoutComponent,
  canActivate: [ IsSimplyConnected ],
  children: [
    { path: '', redirectTo: 'list', pathMatch: 'full' },
    { path: 'list', component: ListOrganizationViewComponent },
    { path: 'details/:name', component: DetailsOrganizationViewComponent }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class OrganizationRoutingModule {
  constructor(core: CoreState) {
    console.log('OrganizationRoutingModule::constructor', core);
    core.register({
      name: 'organization',
      path: '/organization'
    });
  }
}

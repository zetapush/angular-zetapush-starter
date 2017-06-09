import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// TODO Refactor with Lerna
import { IsSimplyConnected } from '../core';
// TODO Refactor with Lerna
import { RouterLayoutComponent, RouterState } from '../router';

import { ListContextViewComponent } from './list-context-view/list-context-view.component';
import { DetailsContextViewComponent } from './details-context-view/details-context-view.component';

const routes: Routes = [
  {
    path: 'context',
    component: RouterLayoutComponent,
    canActivate: [IsSimplyConnected],
    data: {
      links: [{ path: 'list/all', name: 'context/list/all' }],
    },
    children: [
      { path: '', redirectTo: 'list/all', pathMatch: 'full' },
      { path: 'list/all', component: ListContextViewComponent },
      { path: 'details/:id', component: DetailsContextViewComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class ContextRoutingModule {
  constructor(core: RouterState) {
    console.log('ContextRoutingModule::constructor', core);
    core.register({
      name: 'context',
      path: '/context',
    });
  }
}

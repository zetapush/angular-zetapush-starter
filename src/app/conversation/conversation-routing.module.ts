import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// TODO Refactor with Lerna
import { IsSimplyConnected, CoreState } from '../core';
// TODO Refactor with Lerna
import { RouterLayoutComponent } from '../router';

import { ListConversationViewComponent } from './list-conversation-view/list-conversation-view.component';
import { ListUserConversationViewComponent } from './list-user-conversation-view/list-user-conversation-view.component';
import { DetailsConversationViewComponent } from './details-conversation-view/details-conversation-view.component';

const routes: Routes = [{
  path: 'conversation',
  component: RouterLayoutComponent,
  canActivate: [ IsSimplyConnected ],
  data: {
    links: [
      { path: 'list/mine', name: 'conversation/list/mine' }
    ]
  },
  children: [
    { path: '', redirectTo: 'list/mine', pathMatch: 'full' },
    { path: 'list/all', component: ListConversationViewComponent },
    { path: 'list/mine', component: ListUserConversationViewComponent },
    { path: 'details/:owner/:id', component: DetailsConversationViewComponent }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class ConversationRoutingModule {
  constructor(core: CoreState) {
    console.log('ConversationRoutingModule::constructor', core);
    core.register({
      name: 'conversation',
      path: '/conversation'
    });
  }
}

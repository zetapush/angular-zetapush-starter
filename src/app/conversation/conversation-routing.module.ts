import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// TODO Refactor with Lerna
import { IsSimplyConnected, CoreState } from '../core';

import { ConversationLayoutComponent } from './conversation-layout/conversation-layout.component';
import { ListConversationViewComponent } from './list-conversation-view/list-conversation-view.component';
import { ListUserConversationViewComponent } from './list-user-conversation-view/list-user-conversation-view.component';
import { DetailsConversationViewComponent } from './details-conversation-view/details-conversation-view.component';

const routes: Routes = [{
  path: 'conversation',
  component: ConversationLayoutComponent,
  canActivate: [ IsSimplyConnected ],
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

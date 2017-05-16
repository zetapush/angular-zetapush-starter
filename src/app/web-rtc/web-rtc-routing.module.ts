import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// TODO Refactor with Lerna
import { IsSimplyConnected, ViewActionItem, ViewActionRegistry } from '../core';
// TODO Refactor with Lerna
import { RouterLayoutComponent, RouterState } from '../router';
// TODO Refactor with Lerna
import { DetailsConversationComponent } from '../conversation';

import { WebRTCViewComponent } from './webRTC-view/webRTC-view.component';

import { CreateWebRTCViewActionComponent } from './create-webRTC-view-action/create-webRTC-view-action.component';

const routes: Routes = [{
  path: 'webrtc',
  component: RouterLayoutComponent,
  canActivate: [ IsSimplyConnected ],
  data: {
    links: []
  },
  children: [
    { path: '', redirectTo: 'list', pathMatch: 'full' },
    { path: ':owner/:room', component: WebRTCViewComponent }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class WebRTCRoutingModule {
  constructor(core: RouterState, registry: ViewActionRegistry) {
    console.log('WebRTCRoutingModule::constructor', core);
    registry.setActionsByView(DetailsConversationComponent, [
      new ViewActionItem(CreateWebRTCViewActionComponent)
    ]);
  }
}

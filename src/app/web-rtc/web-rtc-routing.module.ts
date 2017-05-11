import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// TODO Refactor with Lerna
import { IsSimplyConnected, ViewActionItem, ViewActionRegistry } from '../core';
// TODO Refactor with Lerna
import { RouterLayoutComponent, RouterState } from '../router';
// TODO Refactor with Lerna
import { DetailsConversationComponent } from '../conversation';

import { ListWebRTCViewComponent } from './list-webRTC-view/list-webRTC-view.component';
import { DetailsWebRTCViewComponent } from './details-webRTC-view/details-webRTC-view.component';

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
    { path: 'list', component: ListWebRTCViewComponent },
    { path: 'details/:owner/:room/:webRTC', component: DetailsWebRTCViewComponent }
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
    core.register({
      name: 'webrtc',
      path: '/webrtc'
    });
    registry.setActionsByView(DetailsConversationComponent, [
      new ViewActionItem(CreateWebRTCViewActionComponent)
    ]);
  }
}

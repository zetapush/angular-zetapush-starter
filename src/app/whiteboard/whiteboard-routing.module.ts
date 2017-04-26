import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// TODO Refactor with Lerna
import { IsSimplyConnected, ViewActionItem, ViewActionRegistry } from '../core';
// TODO Refactor with Lerna
import { RouterLayoutComponent, RouterState } from '../router';
// TODO Refactor with Lerna
import { DetailsConversationComponent } from '../conversation';

import { ListWhiteboardViewComponent } from './list-whiteboard-view/list-whiteboard-view.component';
import { DetailsWhiteboardViewComponent } from './details-whiteboard-view/details-whiteboard-view.component';

import { CreateWhiteboardViewActionComponent } from './create-whiteboard-view-action/create-whiteboard-view-action.component';

const routes: Routes = [{
  path: 'whiteboard',
  component: RouterLayoutComponent,
  canActivate: [ IsSimplyConnected ],
  data: {
    links: []
  },
  children: [
    { path: '', redirectTo: 'list', pathMatch: 'full' },
    { path: 'list', component: ListWhiteboardViewComponent },
    { path: 'details/:owner/:room/:whiteboard', component: DetailsWhiteboardViewComponent }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class WhiteboardRoutingModule {
  constructor(core: RouterState, registry: ViewActionRegistry) {
    console.log('WhiteboardRoutingModule::constructor', core);
    core.register({
      name: 'whiteboard',
      path: '/whiteboard'
    });
    registry.setActionsByView(DetailsConversationComponent, [
      new ViewActionItem(CreateWhiteboardViewActionComponent)
    ]);
  }
}

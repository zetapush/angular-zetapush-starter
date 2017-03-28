import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// TODO Refactor with Lerna
import { IsSimplyConnected, CoreState } from '../core';

import { WhiteboardLayoutComponent } from './whiteboard-layout/whiteboard-layout.component';
import { ListWhiteboardViewComponent } from './list-whiteboard-view/list-whiteboard-view.component';
import { DetailsWhiteboardViewComponent } from './details-whiteboard-view/details-whiteboard-view.component';

const routes: Routes = [{
  path: 'whiteboard',
  component: WhiteboardLayoutComponent,
  canActivate: [ IsSimplyConnected ],
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
  constructor(core: CoreState) {
    console.log('WhiteboardRoutingModule::constructor', core);
    core.register({
      name: 'whiteboard',
      path: '/whiteboard'
    });
  }
}

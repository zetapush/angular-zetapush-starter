import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// TODO Refactor with Lerna
import { IsSimplyConnected } from '../core';
// TODO Refactor with Lerna
import { RouterLayoutComponent, RouterState } from '../router';

import { ListRoomViewComponent } from './list-room-view/list-room-view.component';
import { ListUserRoomViewComponent } from './list-user-room-view/list-user-room-view.component';
import { DetailsRoomViewComponent } from './details-room-view/details-room-view.component';

const routes: Routes = [
  {
    path: 'room',
    component: RouterLayoutComponent,
    canActivate: [IsSimplyConnected],
    data: {
      links: [{ path: 'list/mine', name: 'room/list/mine' }],
    },
    children: [
      { path: '', redirectTo: 'list/mine', pathMatch: 'full' },
      { path: 'list/all', component: ListRoomViewComponent },
      { path: 'list/mine', component: ListUserRoomViewComponent },
      {
        path: 'details/:owner/:id',
        component: DetailsRoomViewComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class RoomRoutingModule {
  constructor(core: RouterState) {
    console.log('RoomRoutingModule::constructor', core);
    core.register({
      name: 'room',
      path: '/room',
    });
  }
}

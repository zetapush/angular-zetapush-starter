import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// TODO Refactor with Lerna
import { IsSimplyConnected } from '../core';
// TODO Refactor with Lerna
import { RouterLayoutComponent, RouterState } from '../router';

import { ListFileViewComponent } from './list-file-view/list-file-view.component';

const routes: Routes = [{
  path: 'file',
  component: RouterLayoutComponent,
  canActivate: [ IsSimplyConnected ],
  data: {
    links: [
      { path: 'list', name: 'file/list' }
    ]
  },
  children: [
    { path: '', redirectTo: 'list', pathMatch: 'full' },
    { path: 'list', component: ListFileViewComponent }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FileRoutingModule {
  constructor(core: RouterState) {
    console.log('FileRoutingModule::constructor', core);
    core.register({
      name: 'file',
      path: '/file'
    });
  }
}

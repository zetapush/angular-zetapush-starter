import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// TODO Refactor with Lerna
import { IsSimplyConnected, CoreState } from '../core';

import { FileLayoutComponent } from './file-layout/file-layout.component';
import { ListFileViewComponent } from './list-file-view/list-file-view.component';

const routes: Routes = [{
  path: 'file',
  component: FileLayoutComponent,
  canActivate: [ IsSimplyConnected ],
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
  constructor(core: CoreState) {
    console.log('FileRoutingModule::constructor', core);
    core.register({
      name: 'file',
      path: '/file'
    });
  }
}

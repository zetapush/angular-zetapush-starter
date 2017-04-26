import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule as NgRouterModule } from '@angular/router';

// TODO Refactor with Lerna
import { CoreModule } from '../core';
// TODO Refactor with Lerna
import { UiModule } from '../ui';

import { RouterState } from './router-state.service';

import { RouterLayoutComponent } from './router-layout/router-layout.component';

@NgModule({
  declarations: [
    RouterLayoutComponent
  ],
  imports: [
    CommonModule,
    NgRouterModule,
    CoreModule,
    UiModule
  ],
  exports: [
    CommonModule,

    RouterLayoutComponent
  ],
  providers: [
    RouterState
  ]
})
export class RouterModule {
  constructor(router: RouterState) {
    router.state.subscribe((state) => {
      console.log('RouterState', state);
    })
  }
}

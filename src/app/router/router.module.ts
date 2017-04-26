import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule as NgRouterModule } from '@angular/router';

import { RouterLayoutComponent } from './router-layout/router-layout.component';

@NgModule({
  declarations: [
    RouterLayoutComponent
  ],
  imports: [
    CommonModule,
    NgRouterModule
  ],
  exports: [
    CommonModule,

    RouterLayoutComponent
  ],
  providers: [
  ]
})
export class RouterModule {}

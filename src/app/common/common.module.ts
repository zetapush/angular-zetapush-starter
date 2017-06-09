import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule as NgCommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// TODO Refactor with Lerna
import { RouterModule } from '../router';
// TODO Refactor with Lerna
import { UiModule } from '../ui';

import { CommonRoutingModule } from './common-routing.module';

import { LoginViewComponent } from './login-view/login-view.component';
import { HomeViewComponent } from './home-view/home-view.component';
import { NotFoundViewComponent } from './not-found-view/not-found-view.component';

@NgModule({
  declarations: [LoginViewComponent, HomeViewComponent, NotFoundViewComponent],
  imports: [
    NgCommonModule,
    BrowserModule,
    FormsModule,

    RouterModule,
    UiModule,

    CommonRoutingModule,
  ],
  exports: [NgCommonModule, FormsModule, CommonRoutingModule],
  providers: [],
})
export class CommonModule {}

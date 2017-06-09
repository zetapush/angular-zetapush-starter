import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// TODO Refactor with Lerna
import { CoreModule } from '../core';
// TODO Refactor with Lerna
import { UiModule } from '../ui';
// TODO Refactor with Lerna
import { UserModule } from '../user';

import { ContextRoutingModule } from './context-routing.module';

import { ContextApiProvider } from './context-api.service';

import { ListContextViewComponent } from './list-context-view/list-context-view.component';
import { DetailsContextViewComponent } from './details-context-view/details-context-view.component';
import { DetailsContextComponent } from './details-context/details-context.component';

@NgModule({
  declarations: [
    ListContextViewComponent,
    DetailsContextViewComponent,
    DetailsContextComponent,
  ],
  exports: [],
  imports: [
    CommonModule,
    FormsModule,

    CoreModule,
    UiModule,
    UserModule,

    ContextRoutingModule,
  ],
  providers: [ContextApiProvider],
})
export class ContextModule {}

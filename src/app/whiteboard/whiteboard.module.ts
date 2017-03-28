import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

// TODO Refactor with Lerna
import { CoreModule } from '../core';
// TODO Refactor with Lerna
import { UserModule } from '../user';
// TODO Refactor with Lerna
import { GroupModule } from '../group';

import { WhiteboardRoutingModule } from './whiteboard-routing.module';

import { WhiteboardApiProvider } from './whiteboard-api.provider';

import { WhiteboardLayoutComponent } from './whiteboard-layout/whiteboard-layout.component';

import { ListWhiteboardViewComponent } from './list-whiteboard-view/list-whiteboard-view.component';
import { DetailsWhiteboardViewComponent } from './details-whiteboard-view/details-whiteboard-view.component';
import { DetailsWhiteboardComponent } from './details-whiteboard/details-whiteboard.component';
import { FabricDirective } from './fabric.directive';

@NgModule({
  declarations: [
    WhiteboardLayoutComponent,
    ListWhiteboardViewComponent,
    DetailsWhiteboardViewComponent,
    DetailsWhiteboardComponent,
    FabricDirective
  ],
  exports: [
    WhiteboardRoutingModule,

    FabricDirective,

    DetailsWhiteboardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    FlexLayoutModule,

    CoreModule,
    GroupModule,
    UserModule,

    WhiteboardRoutingModule
  ],
  providers: [
    WhiteboardApiProvider
  ]
})
export class WhiteboardModule { }

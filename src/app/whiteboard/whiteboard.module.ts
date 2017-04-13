import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// TODO Refactor with Lerna
import { CoreModule } from '../core';
// TODO Refactor with Lerna
import { UiModule } from '../ui';
// TODO Refactor with Lerna
import { UserModule } from '../user';
// TODO Refactor with Lerna
import { GroupModule } from '../group';
// TODO Refactor with Lerna
import { ConversationModule } from '../conversation';

import { WhiteboardRoutingModule } from './whiteboard-routing.module';

import { WhiteboardApiProvider } from './whiteboard-api.service';

import { WhiteboardLayoutComponent } from './whiteboard-layout/whiteboard-layout.component';

import { ListWhiteboardViewComponent } from './list-whiteboard-view/list-whiteboard-view.component';
import { DetailsWhiteboardViewComponent } from './details-whiteboard-view/details-whiteboard-view.component';
import { DetailsWhiteboardComponent } from './details-whiteboard/details-whiteboard.component';
import { FabricDirective } from './fabric.directive';
import { CreateWhiteboardViewActionComponent } from './create-whiteboard-view-action/create-whiteboard-view-action.component';

@NgModule({
  declarations: [
    WhiteboardLayoutComponent,
    ListWhiteboardViewComponent,
    DetailsWhiteboardViewComponent,
    DetailsWhiteboardComponent,
    FabricDirective,
    CreateWhiteboardViewActionComponent
  ],
  exports: [
    WhiteboardRoutingModule,

    FabricDirective,

    DetailsWhiteboardComponent
  ],
  entryComponents: [
    CreateWhiteboardViewActionComponent
  ],
  imports: [
    CommonModule,
    FormsModule,

    CoreModule,
    UiModule,
    GroupModule,
    UserModule,
    ConversationModule,

    WhiteboardRoutingModule
  ],
  providers: [
    WhiteboardApiProvider
  ]
})
export class WhiteboardModule { }

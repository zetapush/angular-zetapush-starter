import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

// TODO Refactor with Lerna
import { CoreModule } from '../core';
// TODO Refactor with Lerna
import { FileModule } from '../file';
// TODO Refactor with Lerna
import { GroupModule } from '../group';
// TODO Refactor with Lerna
import { UserModule } from '../user';
// TODO Refactor with Lerna
import { OrganizationModule } from '../organization';

import { ConversationRoutingModule } from './conversation-routing.module';

import { ConversationApiProvider } from './conversation-api.provider';

import { ConversationLayoutComponent } from './conversation-layout/conversation-layout.component';

import { ListConversationViewComponent } from './list-conversation-view/list-conversation-view.component';
import { ListUserConversationViewComponent } from './list-user-conversation-view/list-user-conversation-view.component';
import { DetailsConversationViewComponent } from './details-conversation-view/details-conversation-view.component';
import { DetailsConversationComponent } from './details-conversation/details-conversation.component';

@NgModule({
  declarations: [
    ConversationLayoutComponent,
    ListConversationViewComponent,
    ListUserConversationViewComponent,
    DetailsConversationViewComponent,
    DetailsConversationComponent
  ],
  exports: [
    ConversationRoutingModule,

    DetailsConversationComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    FlexLayoutModule,

    CoreModule,
    FileModule,
    GroupModule,
    UserModule,
    OrganizationModule,

    ConversationRoutingModule
  ],
  providers: [
    ConversationApiProvider
  ]
})
export class ConversationModule { }

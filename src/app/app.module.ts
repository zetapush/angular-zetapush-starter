import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ZetaPushModule, ZetaPushClientConfig } from 'zetapush-angular';

import { environment } from '../environments/environment';

// TODO Externalize via lerna
import { CommonModule } from './common';
// TODO Externalize via lerna
import { CoreModule } from './core';
// TODO Externalize via lerna
import { FileModule } from './file';
// TODO Externalize via lerna
import { GroupModule } from './group';
// TODO Externalize via lerna
import { OrganizationModule } from './organization';
// TODO Externalize via lerna
import { ConversationModule } from './conversation';
// TODO Externalize via lerna
import { RoleModule } from './role';
// TODO Externalize via lerna
import { UserModule } from './user';
// TODO Externalize via lerna
import { WhiteboardModule } from './whiteboard';
// TODO Externalize via lerna
import { ContextModule } from './context';
// TODO Externalize via lerna
import { WorkflowModule } from './workflow';
// TODO Externalize via lerne
import { WebRTCModule } from './web-rtc';

import { AppComponent } from './app.component';

// Add active application modules here
const APPLICATIONS_MODULES = [
  FileModule,
  GroupModule,
  RoleModule,
  UserModule,
  OrganizationModule,
  ConversationModule,
  WhiteboardModule,
  ContextModule,
  WorkflowModule,
  WebRTCModule,
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    // Provide ZetaPush Services
    ZetaPushModule,
    // Provide Core Services
    CoreModule,
    // Applications modules
    ...APPLICATIONS_MODULES,
    // Provide Common Components and Routing
    CommonModule
  ],
  providers: [
    { provide: ZetaPushClientConfig, useValue: environment.zetapush },
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

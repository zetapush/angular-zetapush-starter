import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { RouterModule } from '@angular/router';

// TODO Externalize via lerna
import { ZetaPushModule } from './zetapush';
// TODO Externalize via lerna
import { CommonModule } from './common';
// TODO Externalize via lerna
import { CoreModule } from './core';
// TODO Externalize via lerna
import { GroupModule } from './group';
// TODO Externalize via lerna
import { OrganizationModule } from './organization';
// TODO Externalize via lerna
import { RoleModule } from './role';
// TODO Externalize via lerna
import { UserModule } from './user';
// TODO Externalize via lerna
import { IotModule } from './iot';

import { AppComponent } from './app.component';

// Add active application modules here
const APPLICATIONS_MODULES = [
  GroupModule,
  RoleModule,
  OrganizationModule,
  UserModule,
  IotModule
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
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { RouterModule } from '@angular/router';

// TODO Externalize via lerna
import { ZetaPushModule } from './zetapush';
// TODO Externalize via lerna
import { CoreModule } from './core';
// TODO Externalize via lerna
import { RoleModule } from './role';
// TODO Externalize via lerna
import { UserModule } from './user';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    RouterModule,

    ZetaPushModule,

    CoreModule,
    RoleModule,
    UserModule
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

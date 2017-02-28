import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';

import { AppRoutingModule } from './app-routing.module'
import { ZetaPushModule } from './../zetapush/zetapush.module';

import { AppComponent } from './app.component';
import { LoginViewComponent } from './login-view/login-view.component';
import { HomeViewComponent } from './home-view/home-view.component';

import { CanActivateConnected } from './can-activate-connected.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginViewComponent,
    HomeViewComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    ZetaPushModule,
    AppRoutingModule
  ],
  providers: [
    CanActivateConnected,
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

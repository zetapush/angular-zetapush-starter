import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';

import { AppRoutingModule } from './app-routing.module'
import { ZetaPushModule } from './../zetapush/zetapush.module';

import { AppComponent } from './app.component';
import { LoginViewComponent } from './login-view/login-view.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginViewComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    ZetaPushModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

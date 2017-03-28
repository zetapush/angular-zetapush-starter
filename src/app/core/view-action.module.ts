import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { ViewActionContainerComponent } from './view-action-container.component';
import { ViewActionHostDirective } from './view-action-host.directive';
import { ViewActionRegistry } from './view-action-registry.service';

@NgModule({
  imports: [
    BrowserModule
  ],
  providers: [
    ViewActionRegistry
  ],
  declarations: [
    ViewActionContainerComponent,
    ViewActionHostDirective
  ],
  exports: [
    ViewActionContainerComponent
  ]
})
export class ViewActionModule { }

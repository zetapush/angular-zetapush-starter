import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';

import { IotRoutingModule } from './iot-routing.module';
import { IotLayoutComponent } from './iot-layout/iot-layout.component';
import { ShowAllBeaconsViewComponent } from './show-all-beacons-view/show-all-beacons-view.component';
import { ShowBeaconsPerAreaViewComponent } from './show-beacons-per-area-view/show-beacons-per-area-view.component';
import { IotApiProvider } from './iot-api-provider'; 


@NgModule({
  imports: [
    CommonModule,
    IotRoutingModule,
    MaterialModule
  ],
  declarations: [IotLayoutComponent, ShowAllBeaconsViewComponent, ShowBeaconsPerAreaViewComponent],
  providers: [
    IotApiProvider
  ]
})
export class IotModule { }

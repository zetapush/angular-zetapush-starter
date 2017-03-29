import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnlockingApiProvider } from './unlocking-api-provider';
import { UnlockingRoutingModule } from './unlocking-routing.module';
import { UnlockingLayoutComponent } from './unlocking-layout/unlocking-layout.component';

@NgModule({
  imports: [
    CommonModule,
    UnlockingRoutingModule
  ],
  declarations: [UnlockingLayoutComponent],
  providers: [
  	UnlockingApiProvider
  ]
})
export class UnlockingModule { }

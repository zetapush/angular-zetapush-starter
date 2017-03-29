import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IsSimplyConnected, CoreState } from '../core';
import { UnlockingLayoutComponent } from './unlocking-layout/unlocking-layout.component';

const routes: Routes = [{
	path: 'unlocking',
	component: UnlockingLayoutComponent,
	canActivate: [IsSimplyConnected]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UnlockingRoutingModule { 
constructor(core: CoreState) {
	console.log("UnlockingRoutingModule::constructor", core);
	core.register({
		name: 'unlocking',
		path: '/unlocking'
	});
}}

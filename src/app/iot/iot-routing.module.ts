import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IsSimplyConnected, CoreState } from '../core';

import { IotLayoutComponent } from './iot-layout/iot-layout.component';

import { ShowAllBeaconsViewComponent } from './show-all-beacons-view/show-all-beacons-view.component';
import { ShowBeaconsPerAreaViewComponent } from './show-beacons-per-area-view/show-beacons-per-area-view.component';

const routes: Routes = [{
	path: 'iot',
	component: IotLayoutComponent,
	canActivate: [IsSimplyConnected],
	children: [
	{ path: '', redirectTo: 'allBeacons', pathMatch: 'full'},
	{ path: 'allBeacons', component: ShowAllBeaconsViewComponent },
	{ path: 'beaconsPerArea', component: ShowBeaconsPerAreaViewComponent }]
}];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IotRoutingModule {
constructor(core: CoreState) {
	console.log('IotRoutingModule::constructor', core);
	core.register({
		name: 'iot',
		path: '/iot'
	});
} }

import { Component, OnInit } from '@angular/core';
import { BeaconsService } from '../beacons-service/beacons.service';
import { ZetaPushClient } from '../../zetapush';
import { services } from 'zetapush-js';
import { BeaconDetection, IotApi } from '../iot-api.service';

@Component({
	selector: 'zp-show-all-beacons',
	templateUrl: './show-all-beacons-view.component.html',
	providers: [BeaconsService]
})

export class ShowAllBeaconsViewComponent implements OnInit {

	beaconDetections : Array<BeaconDetection> = [];

	constructor(private api: IotApi) {}

	private getAllBeaconDetections() {
		this.api.getAllBeaconDetections().then(( list ) => {
			console.log('ShowAllBeaconsViewComponent::getAllBeaconDetections', list);
			this.beaconDetections = list['tabOfAllBeacons'];
		}, (errors) => {
			console.error('ShowAllBeaconsViewComponent::getAllBeaconDetections', errors);
		});
	}

	ngOnInit() {
		this.getAllBeaconDetections();
	}
}
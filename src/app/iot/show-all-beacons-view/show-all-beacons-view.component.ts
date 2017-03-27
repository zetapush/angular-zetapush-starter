import { Component, OnInit } from '@angular/core';
import { BeaconsService } from '../beacons-service/beacons.service';
import { ZetaPushClient } from '../../zetapush';
import { services } from 'zetapush-js';
import { BeaconDetection, IotApi } from '../iot-api.service';
import { Observable } from 'rxjs/Observable';

@Component({
	selector: 'zp-show-all-beacons',
	templateUrl: './show-all-beacons-view.component.html',
	providers: [BeaconsService]
})

export class ShowAllBeaconsViewComponent implements OnInit {

	beaconDetections : Array<BeaconDetection> = [];
	beaconDetectionsFlow : Observable<Array<BeaconDetection>>;

	constructor(private api: IotApi) {
		api.onNewBeaconDetection.subscribe((beaconDetection) => {
			console.log('ShowAllBeaconsViewComponent::onNewBeaconDetections', beaconDetection);
			this.beaconDetections.push(beaconDetection['res']);
		});
	}

	private getAllBeaconDetections() {
		this.api.getAllBeaconDetections().then(( list ) => {
			console.log('ShowAllBeaconsViewComponent::getAllBeaconDetections', list);
			
			for (let b of list['tabOfAllBeacons']){
					this.beaconDetections.push(b);
			}
			
		}, (errors) => {
			console.error('ShowAllBeaconsViewComponent::getAllBeaconDetections', errors);
		});
	}

	ngOnInit() {

		// Get all beacon detections on init
		this.getAllBeaconDetections();
	}
}
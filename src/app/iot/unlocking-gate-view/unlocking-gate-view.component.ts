import { Component, OnInit } from '@angular/core';
import { BeaconsService } from '../beacons-service/beacons.service';
import { Beacon } from '../beacons-service/beacon';
import { Observable } from 'rxjs/Observable';
import { BeaconDetection, IotApi} from '../iot-api.service';


@Component({
	selector: 'zp-unlocking-gate',
	templateUrl: './unlocking-gate-view.component.html',
	providers: [BeaconsService]
})

export class UnlockingGateViewComponent implements OnInit {

	beaconDetectionsFlow : Observable<Array<BeaconDetection>>;
	beaconDetectionsLock : Array<BeaconDetection> = [];

	constructor(private api: IotApi) {
		api.onNewBeaconDetection.subscribe((beaconDetection) => {
			console.log('UnlockingGateViewGate::onNewBeaconDetections', beaconDetection);
			
			// Check if the beacon detection if from lock area
			if (beaconDetection['res'].beacon == "Lock"){
				this.addNewBeaconDetection(beaconDetection['res']);
			}
		});
	}

	private getAllBeaconDetections() {
		this.api.getAllBeaconDetections().then(( list ) => {
			console.log('UnlockingGateViewGate::getAllBeaconDetections', list);
			
			// Check if the beacon detection if from lock area
			for (let b of list['tabOfAllBeacons']){
				if (b.beacon == "Lock"){
					this.beaconDetectionsLock.push(b);
				}
			}

		}, (errors) => {
			console.error('UnlockingGateViewGate::getAllBeaconDetections', errors);
		});
	}

	private addNewBeaconDetection(beaconDetection: BeaconDetection) {
		// Check if the beacon detection is already present (in this case => update)
		let present = false;
		for (let b of this.beaconDetectionsLock){
			if (b.id == beaconDetection.id && b.beacon == beaconDetection.beacon){
				b.timestamp = beaconDetection.timestamp;
				b.distance = beaconDetection.distance;
				present = true;
			}
		}

		if (!present){
			this.beaconDetectionsLock.push(beaconDetection);
		}

	}

	ngOnInit(): void {
		
		// Get all beacon detections on init
		this.getAllBeaconDetections();
	}
}
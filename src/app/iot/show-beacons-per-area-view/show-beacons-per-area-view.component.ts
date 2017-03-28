import { Component, OnInit } from '@angular/core';
import { BeaconsService } from '../beacons-service/beacons.service';
import { Beacon } from '../beacons-service/beacon';
import { Observable } from 'rxjs/Observable';
import { BeaconDetection, IotApi} from '../iot-api.service';

@Component({
	selector: 'zp-show-beacons-per-area',
	templateUrl: './show-beacons-per-area-view.component.html',
	providers: [BeaconsService]
})

export class ShowBeaconsPerAreaViewComponent implements OnInit {

	beaconDetectionsFlow : Observable<Array<BeaconDetection>>;

	// Different array to stock the beacon detections
	beaconDetectionsEntrance : Array<BeaconDetection> = [];
	beaconDetectionsExit : Array<BeaconDetection> = [];
	beaconDetectionsLock : Array<BeaconDetection> = [];
	beaconDetectionsBeaconOne : Array<BeaconDetection> = [];
	beaconDetectionsBeaconTwo : Array<BeaconDetection> = [];
	beaconDetectionsBeaconThree : Array<BeaconDetection> = [];

	constructor(private api: IotApi) {
		api.onNewBeaconDetection.subscribe((beaconDetection) => {
			console.log('ShowBeaconsPerAreaViewComponent::onNewBeaconDetections', beaconDetection);
			this.saveBeaconDetection(beaconDetection['res']);
		});
	}

	private getAllBeaconDetections() {
		this.api.getAllBeaconDetections().then(( list ) => {
			console.log('ShowBeaconsPerAreaViewComponent::getAllBeaconDetections', list);
			let allBeaconDetections = list['tabOfAllBeacons'];

			for (let beaconDetection of allBeaconDetections) {
				this.saveBeaconDetection(beaconDetection);
			} 
			
		}, (errors) => {
			console.error('ShowBeaconsPerAreaViewComponent::getAllBeaconDetections', errors);
		});
	}

	ngOnInit(): void {
		
		// Get all beacon detections on init
		this.getAllBeaconDetections();
	}

	// function to select the proper array to stock beacon detections
	private saveBeaconDetection(beaconDetection: BeaconDetection) {

		switch(beaconDetection.beacon){
			case "Entrance":
				this.addNewBeaconDetection(beaconDetection, this.beaconDetectionsEntrance);
				break;
			case "Exit":
				this.addNewBeaconDetection(beaconDetection, this.beaconDetectionsExit);
				break;
			case "Lock":
				this.addNewBeaconDetection(beaconDetection, this.beaconDetectionsLock);
				break;
			case "One":
				this.addNewBeaconDetection(beaconDetection, this.beaconDetectionsBeaconOne);
				break;
			case "Two":
				this.addNewBeaconDetection(beaconDetection, this.beaconDetectionsBeaconTwo);
				break;
			case "Three":
				this.addNewBeaconDetection(beaconDetection, this.beaconDetectionsBeaconThree);
				break;
			default:
				console.error("Error to handle beacon detection");
				break;
		}
	}

	private addNewBeaconDetection(beaconDetection: BeaconDetection, tab: Array<BeaconDetection>) {
		// Check if the beacon detection is already present (in this case => update)
		let present = false;
		for (let b of tab){
			if (b.id == beaconDetection.id && b.beacon == beaconDetection.beacon){
				b.timestamp = beaconDetection.timestamp;
				b.distance = beaconDetection.distance;
				present = true;
			}
		}

		if (!present){
			tab.push(beaconDetection);
		}
	}
}
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
				this.beaconDetectionsEntrance.push(beaconDetection);
				break;
			case "Exit":
				this.beaconDetectionsExit.push(beaconDetection);
				break;
			case "Lock":
				this.beaconDetectionsLock.push(beaconDetection);
				break;
			case "One":
				this.beaconDetectionsBeaconOne.push(beaconDetection);
				break;
			case "Two":
				this.beaconDetectionsBeaconTwo.push(beaconDetection);
				break;
			case "Three":
				this.beaconDetectionsBeaconThree.push(beaconDetection);
				break;
			default:
				console.error("Error to handle beacon detection");
				break;
		}
	}
}
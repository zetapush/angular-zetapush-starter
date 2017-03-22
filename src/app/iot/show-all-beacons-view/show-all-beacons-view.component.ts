import { Component, OnInit } from '@angular/core';
import { BeaconsService } from '../beacons-service/beacons.service';
import { Beacon } from '../beacons-service/beacon';
import { ZetaPushClient } from '../../zetapush';
import { services } from 'zetapush-js';

@Component({
	selector: 'zp-show-all-beacons',
	templateUrl: './show-all-beacons-view.component.html',
	providers: [BeaconsService],
	styleUrls: ['./show-all-beacons-view.component.css']
})

export class ShowAllBeaconsViewComponent implements OnInit {

	id = "none";

	constructor(private beaconsService: BeaconsService, private client: ZetaPushClient) {

		// Create listener to get beacons
		this.client.createService({
			Type: services.Macro,
			listener: {
				newBeacon: (message) => {
					// Handle result of listener
					//console.log("Beacon id : " + message.data.result.res_id);
					this.id = "test";
					console.log("Result id : ", message.data.result.res_id);
				}	
			}
		}).call({name: 'newBeacon'})

		
	}

	

	beacons: Beacon[];	

	getBeacons(): void {
		this.beaconsService.getBeacons().then(beacons => {this.beacons = beacons});
	}

	ngOnInit(): void {
		this.getBeacons();
	}


	

	// Call the apiListenerBeacon


}
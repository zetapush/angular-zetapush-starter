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

	beacons: Beacon[];
	beaconsInList: string[] = [];

	constructor(private beaconsService: BeaconsService, private client: ZetaPushClient) {

		// Create listener to get beacons
		const apiListenerBeacon = client.createService({
			Type: services.Macro,
			listener: {
				updateUI({ data }) {

					// Handle result of listener
					var beacons = data.result.allDevices;

					for (var i=0; i<beacons.length; i++){
						console.log("beacon : " + beacons[i]);
					}
				}
			}
		})

		// Call the apiListenerBeacon
		apiListenerBeacon.call({ name: 'updateUI'})


	}

	getBeacons(): void {
		this.beaconsService.getBeacons().then(beacons => {this.beacons = beacons, this.putBeaconInList()});
	}

	putBeaconInList(): void {
		this.beaconsInList.push("ID");
		this.beaconsInList.push("Area");
		this.beaconsInList.push("Distance");

		for(var i=0; i<this.beacons.length; i=i+1){
			this.beaconsInList.push(this.beacons[i].id);
			this.beaconsInList.push(this.beacons[i].area);
			this.beaconsInList.push(this.beacons[i].distance.toString());
		}
	}

	ngOnInit(): void {
		this.getBeacons();
	}
}
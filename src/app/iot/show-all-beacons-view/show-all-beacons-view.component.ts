import { Component, OnInit } from '@angular/core';
import { BeaconsService } from '../beacons-service/beacons.service';
import { Beacon } from '../beacons-service/beacon';

@Component({
	selector: 'zp-show-all-beacons',
	templateUrl: './show-all-beacons-view.component.html',
	providers: [BeaconsService]
})

export class ShowAllBeaconsViewComponent implements OnInit {

	beacons: Beacon[];

	constructor(private beaconsService: BeaconsService) {}

	getBeacons(): void {
		this.beaconsService.getBeacons().then(beacons => this.beacons = beacons);
	}

	ngOnInit(): void {
		this.getBeacons();
		console.log(this.beacons);
	}
}
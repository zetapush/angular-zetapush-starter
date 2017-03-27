import { Component, OnInit } from '@angular/core';
import { BeaconsService } from '../beacons-service/beacons.service';
import { Beacon } from '../beacons-service/beacon';


@Component({
	selector: 'zp-show-beacons-per-area',
	templateUrl: './show-beacons-per-area-view.component.html',
	providers: [BeaconsService]
})

export class ShowBeaconsPerAreaViewComponent implements OnInit {

	constructor(private beaconsService: BeaconsService) {}

	beacons : Beacon[];

	getBeacons(): void {
		this.beaconsService.getBeacons().then(beacons => this.beacons = beacons);
	}

	ngOnInit(): void {
		this.getBeacons();
	}
}
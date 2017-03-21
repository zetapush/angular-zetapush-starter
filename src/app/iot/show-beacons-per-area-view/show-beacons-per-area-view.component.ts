import { Component, OnInit } from '@angular/core';
import { BeaconsService } from '../beacons-service/beacons.service';
import { Beacon } from '../beacons-service/beacon';
import { BeaconFilter } from '../pipes/beacon-filter.pipe';


@Component({
	selector: 'zp-show-beacons-per-area',
	templateUrl: './show-beacons-per-area-view.component.html',
	providers: [BeaconsService]
})

export class ShowBeaconsPerAreaViewComponent implements OnInit {

	constructor(private beaconsService: BeaconsService) {}

	// Filters
	filterArea1 = {area: 'area1'};
	filterArea2 = {area: 'area2'};
	filterArea3 = {area: 'area3'};
	filterEntrance = {area: 'entrance'};
	filterExit = {area: 'exit'};
	filterLock = {area: 'lock'};


	beacons : Beacon[];

	getBeacons(): void {
		this.beaconsService.getBeacons().then(beacons => this.beacons = beacons);
	}

	ngOnInit(): void {
		this.getBeacons();
	}
}
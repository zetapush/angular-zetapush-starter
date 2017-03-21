import { Injectable } from '@angular/core';
import { Beacon } from './beacon';
import { beacons } from './beacons-list';

@Injectable()
export class BeaconsService{

	getBeacons(): Promise<Beacon[]> {
		return Promise.resolve(beacons);
	}

}
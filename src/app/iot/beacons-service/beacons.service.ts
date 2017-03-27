import { Injectable } from '@angular/core';
import { Beacon } from './beacon';
import { beacons } from './beacons-list';
import { ZetaPushClientFactory } from '../../zetapush/di';
import { SmartClientOptions } from 'zetapush-js';
import { environment } from '../../../environments/environment';


@Injectable()
export class BeaconsService{

	getBeacons(): Promise<Beacon[]> {
		return Promise.resolve(beacons);
	}
}
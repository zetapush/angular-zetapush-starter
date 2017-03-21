import { Pipe, PipeTransform, Injectable } from '@angular/core';

@Pipe({
	name: 'beacon_filter',
	pure: false
})

@Injectable()
export class BeaconFilter implements PipeTransform {
	transform(beacons: any[], args: any[]): any {
		return beacons.filter(beacon => beacon.area.indexOf(args[0].area) !== -1);
	}
}
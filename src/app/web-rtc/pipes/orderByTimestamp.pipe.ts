import { Pipe, PipeTransform } from '@angular/core';
import { photoObject } from '../webRTC-service/webRTC.service';

/**
 * Order array of photos with their timestamp
 */

@Pipe({name: 'orderByTimestamp'})
export class OrderByTimestampPipe implements PipeTransform {
    transform(array: Array<photoObject>, args: number): Array<photoObject> {

        array.sort((a: any, b: any) => {
            if (a.timestamp > b.timestamp){
                return -1;
            } else if ( a.timestamp < b.timestamp) {
                return 1;
            } else {
                return 0;
            }
        });
        return array;
    }
}
import { Api } from '../zetapush';
import { Observable } from 'rxjs/Observable';

export interface BeaconDetection {
	beacon: string;
	distance: number;
	timestamp: number;
	id: string;
}

// TODO Should be auto-generated
export class IotApi extends Api{
    
    onNewBeaconDetection: Observable<BeaconDetection>;

	// Call the macroscript to get all beacon detections from the Zetapush platform
  	getAllBeaconDetections(): Promise<Array<BeaconDetection>> {
  		return this.$publish('getAllBeaconDetections', { });
  	}
  	// To subscribe to the new beacon detections
  	newBeaconDetection(): Promise<BeaconDetection> {
  		return this.$publish('newBeaconDetection', {});
  	}

}

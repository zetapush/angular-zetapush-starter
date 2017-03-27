import { Api } from '../zetapush';

export interface BeaconDetection {
	name: string;
	distance: number;
	timestamp: number;
	id: string;
}

// TODO Should be auto-generated
export class IotApi extends Api{

  	getAllBeaconDetections(): Promise<Array<BeaconDetection>> {
  		return this.$publish('getAllBeaconDetections', { });
  	}
}

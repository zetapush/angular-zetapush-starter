import { Api } from '../zetapush';

export interface Beacon {
	id: string;
	area: string;
	distance: number;
	timestamp: number;
}

export class IotApi extends Api{
}

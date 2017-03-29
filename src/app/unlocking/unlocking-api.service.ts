import { Injectable } from '@angular/core';
import { Api } from '../zetapush';


export class UnlockingApi extends Api {

	// Call this macroscript to unlock the gate by a HTTP request
	unlockTheGate() {
		return this.$publish('unlockTheGate', { });
	}
}


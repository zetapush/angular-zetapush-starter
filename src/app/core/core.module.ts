import { NgModule } from '@angular/core';

import { IsSimplyConnected, IsWeaklyConnected } from './auth-guard.service';
import { CoreState } from './core-state.service';

@NgModule({
  declarations: [],
  imports: [],
  exports: [],
  providers: [
    IsSimplyConnected,
    IsWeaklyConnected,
    CoreState
  ]
})
export class CoreModule {
  constructor(private core: CoreState) {
    core.state.subscribe((modules) => {
      console.log('CoreModule', modules);
    });
  }
}

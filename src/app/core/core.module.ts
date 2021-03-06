import { NgModule } from '@angular/core';

import { IsSimplyConnected, IsWeaklyConnected } from './auth-guard.service';
import { CoreState } from './core-state.service';

import { ViewActionContainerComponent } from './view-action-container.component';
import { ViewActionHostDirective } from './view-action-host.directive';
import { ViewActionRegistry } from './view-action-registry.service';

@NgModule({
  declarations: [
    ViewActionContainerComponent,
    ViewActionHostDirective
  ],
  imports: [],
  exports: [
    ViewActionContainerComponent
  ],
  providers: [
    IsSimplyConnected,
    IsWeaklyConnected,
    CoreState,
    ViewActionRegistry
  ]
})
export class CoreModule {
  constructor(private core: CoreState) {
    core.state.subscribe((modules) => {
      console.log('CoreModule', modules);
    });
  }
}

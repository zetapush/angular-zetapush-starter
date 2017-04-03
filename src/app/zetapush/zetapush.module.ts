import { NgModule } from '@angular/core';

import { ZetaPushClient, ZetaPushConnection } from './core';
import { ZetaPushClientConfig, ZetaPushClientFactory, ZetaPushConnectionFactory } from './di';

@NgModule({
  declarations: [],
  imports: [],
  providers: [
    { provide: ZetaPushClient, useFactory: ZetaPushClientFactory, deps: [ ZetaPushClientConfig ] },
    { provide: ZetaPushConnection, useFactory: ZetaPushConnectionFactory, deps: [ ZetaPushClient ] }
  ],
  bootstrap: []
})
export class ZetaPushModule {}

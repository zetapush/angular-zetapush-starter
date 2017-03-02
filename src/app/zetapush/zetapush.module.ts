import { NgModule } from '@angular/core';

import { environment } from '../../environments/environment';

import { ZetaPushClient, ZetaPushConnection } from './core';
import { ZetaPushClientConfig, ZetaPushClientFactory, ZetaPushConnectionFactory } from './di';

@NgModule({
  declarations: [],
  imports: [],
  providers: [
    { provide: ZetaPushClientConfig, useValue: environment.zetapush },
    { provide: ZetaPushClient, useFactory: ZetaPushClientFactory, deps: [ ZetaPushClientConfig ] },
    { provide: ZetaPushConnection, useFactory: ZetaPushConnectionFactory, deps: [ ZetaPushClient ] }
  ],
  bootstrap: []
})
export class ZetaPushModule {}

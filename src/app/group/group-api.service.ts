import { Injectable } from '@angular/core';

export interface Metadata {
  [key: string]: any;
}

export interface Group {
  id: string;
  deploymentId: string;
  name: string;
  owner: string;
  resource: string;
  members: Array<any>;
  metadata: Metadata;
  tags: Array<string>;
}

@Injectable()
export class GroupApi {

  constructor() { }

}

import { Type } from '@angular/core';

export class ViewActionItem {
  constructor(public component: Type<any>, public parameters: any) {}
}

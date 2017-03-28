import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[zp-view-action-host]',
})
export class ViewActionHostDirective {
  constructor(public viewContainerRef: ViewContainerRef) { }
}

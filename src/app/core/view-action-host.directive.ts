import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[zpViewActionHost]',
})
export class ViewActionHostDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}

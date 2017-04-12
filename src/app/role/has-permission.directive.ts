import { Directive, ElementRef, Input, OnChanges, OnInit } from '@angular/core';

import { CheckPermission, PermissionApi } from './permission-api.service';

@Directive({
  selector: '[zpHasPermission]'
})
export class HasPermissionDirective implements OnChanges, OnInit {

  @Input() zpHasPermission: string;

  private check: CheckPermission;

  constructor(private api: PermissionApi, private el: ElementRef) {
    api.onAddPermissionMember.subscribe((check) => {
      if (this.check && this.check.id === check.id) {
        console.log('HasPermissionDirective::onAddPermissionMember', check);
        this.setVisibility(check.has);
      }
    });
    api.onRemovePermissionMember.subscribe((check) => {
      if (this.check && this.check.id === check.id) {
        console.log('HasPermissionDirective::onRemovePermissionMember', check);
        this.setVisibility(check.has);
      }
    });
  }

  ngOnChanges(changes) {
    console.log('HasPermissionDirective::ngOnChanges', changes);
  }

  ngOnInit() {
    console.log('HasPermissionDirective::ngOnInit', this.zpHasPermission);

    this.el.nativeElement.setAttribute('hidden', true);
    this.api.hasPermission(this.zpHasPermission).then((check) => {
      console.log('HasPermissionDirective::hasPermission', check);
      this.check = check;
      this.setVisibility(check.has);
    }, (errors) => {
      console.error('HasPermissionDirective::hasPermission', errors);
    });
  }

  private setVisibility(has: boolean) {
      const method = `${(has ? 'remove' : 'set')}Attribute`;
      this.el.nativeElement[method]('hidden', true);
  }
}

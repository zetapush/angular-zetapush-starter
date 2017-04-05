import { Directive, ElementRef, Input, OnChanges, OnInit } from '@angular/core';

import { RoleApi } from './role-api.service';

@Directive({
  selector: '[zpHasPermission]'
})
export class HasPermissionDirective implements OnChanges, OnInit {

  @Input() zpHasPermission: string;

  constructor(private api: RoleApi, private el: ElementRef) {

  }

  ngOnChanges(changes) {
    console.log('HasPermissionDirective::ngOnChanges', changes);
  }

  ngOnInit() {
    console.log('HasPermissionDirective::ngOnInit', this.zpHasPermission);

    this.el.nativeElement.setAttribute('hidden', true);
    this.api.hasPermission(this.zpHasPermission).then((check) => {
      console.log('HasPermissionDirective::hasPermission', check);
      const method = `${(check.has ? 'remove' : 'set')}Attribute`;
      this.el.nativeElement[method]('hidden', true);
    }, (errors) => {
      console.error('HasPermissionDirective::hasPermission', errors);
    });
  }
}

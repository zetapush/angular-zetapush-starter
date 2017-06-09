import {
  Component,
  Input,
  AfterViewInit,
  ViewChild,
  ComponentFactoryResolver,
} from '@angular/core';

import { ReplaySubject } from 'rxjs/ReplaySubject';

import { View } from './view';
import { ViewActionRegistry } from './view-action-registry.service';
import { ViewActionComponent } from './view-action.component';
import { ViewActionHostDirective } from './view-action-host.directive';
import { ViewActionItem } from './view-action-item';

@Component({
  selector: 'zp-view-action-container',
  template: `
    <ng-template zpViewActionHost></ng-template>
  `,
})
export class ViewActionContainerComponent implements AfterViewInit {
  @Input() context: ReplaySubject<any>;
  @Input() view: View;
  @ViewChild(ViewActionHostDirective) zpViewActionHost: ViewActionHostDirective;

  private actions: ViewActionItem[];

  constructor(
    private resolver: ComponentFactoryResolver,
    private registry: ViewActionRegistry,
  ) {}

  ngAfterViewInit() {
    console.log(
      'ViewActionContainerComponent::ngAfterInitView',
      this.context,
      this.view,
    );
    this.actions = this.registry.getActionsByView(this.view);
    const container = this.zpViewActionHost.viewContainerRef;
    container.clear();
    this.actions.forEach(action => {
      const factory = this.resolver.resolveComponentFactory(action.component);
      const ref = container.createComponent(factory);
      const component = <ViewActionComponent>ref.instance;
      // Inject initial parameters
      component.parameters = action.parameters;
      // Inject view context
      component.context = this.context;
      // Notify context injected
      component.onContextInjected(this.context);
    });
  }
}

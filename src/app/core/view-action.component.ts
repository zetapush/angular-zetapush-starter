import { ReplaySubject } from 'rxjs/ReplaySubject';

export interface ViewActionComponent {
  context: ReplaySubject<any>;
  parameters: any;
  onContextInjected(context: ReplaySubject<any>);
}

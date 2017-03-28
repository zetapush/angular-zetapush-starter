import { Injectable, Type } from '@angular/core';

import { ViewActionItem } from './view-action-item';

export type View = Type<any>;

@Injectable()
export class ViewActionRegistry {

  private state = new WeakMap<View, Array<ViewActionItem>>();

  setActionsByView(view: View, ads: Array<ViewActionItem>) {
    this.state.set(view, ads);
  }

  getActionsByView(view: View): Array<ViewActionItem> {
    return this.state.has(view) ? this.state.get(view) : [];
  }
}

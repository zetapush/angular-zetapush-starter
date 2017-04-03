import { Injectable } from '@angular/core';

import { ViewActionItem } from './view-action-item';
import { View } from './view';

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

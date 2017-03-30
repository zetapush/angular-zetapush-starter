import { Component } from '@angular/core';

import { Color, Mode } from '../';

@Component({
  selector: 'zp-list-whiteboard-view',
  templateUrl: './list-whiteboard-view.component.html',
  styles: [`
    md-radio-button {
      font-weight: bold;
    }
    zp-fabric {
      border: 1px solid #000;
      height: 500px;
      display: block;
    }
  `]
})
export class ListWhiteboardViewComponent {

  mode: Mode = 'Draw';
  modes: Array<Mode> = ['Draw', 'Edit', 'Text', 'Arrow'];

  color: Color = 'rgb(229,80,49)';
  colors: Array<Color> = ['rgb(229,80,49)', 'rgb(253,203,55)', 'rgb(152,192,72)', 'rgb(0,169,228)'];

  onObjectAdded($event) {
    console.log('ListWhiteboardViewComponent::onObjectAdded', $event);
  }

  onObjectModified($event) {
    console.log('ListWhiteboardViewComponent::onObjectModified', $event);
  }

  onObjectSelected($event) {
    console.log('ListWhiteboardViewComponent::onObjectSelected', $event);
  }

  onObjectRemoved($event) {
    console.log('ListWhiteboardViewComponent::onObjectRemoved', $event);
  }


}

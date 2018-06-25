import { Component } from '@angular/core';

@Component({
  selector: 'zp-embedded-sortable',
  template: `
    <h4>Move items between multi list sortable containers</h4>
    <div fxLayout="row" fxLayoutAlign="space-around center">
      <div *ngFor="let container of containers; let i = index" fxFlex="30">
        <mat-card
          dnd-sortable-container [sortableData]="container.widgets" [dropZones]="['widget-dropZone']">
          <mat-card-title>{{container.id}} - {{container.name}}</mat-card-title>
          <mat-card-content>
            <ul class="list-group">
              <li *ngFor="let widget of container.widgets; let x = index" class="list-group-item"
                  dnd-sortable [sortableIndex]="x" [dragData]="widget">{{widget.name}}</li>
            </ul>
          </mat-card-content>
        </mat-card>
      </div>
    </div>
    <pre>{{ containers | json }}</pre>
`,
})
export class EmbeddedSortableComponent {
  containers: Array<Container> = [
    new Container(1, 'Container 1', [new Widget('1'), new Widget('2')]),
    new Container(2, 'Container 2', [new Widget('3'), new Widget('4')]),
    new Container(3, 'Container 3', [new Widget('5'), new Widget('6')]),
  ];
}

class Container {
  constructor(
    public id: number,
    public name: string,
    public widgets: Array<Widget>,
  ) {}
}

class Widget {
  constructor(public name: string) {}
}

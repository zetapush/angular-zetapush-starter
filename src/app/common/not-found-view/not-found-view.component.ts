import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'zp-not-found-view',
  template: `
    <h1>Page Not Found</h1>
    <button type="button" md-button color="accent" (click)="onBackClick()">Go Back</button>
  `,
  styles: [`

  `]
})
export class NotFoundViewComponent {

  constructor(private location: Location) { }

  onBackClick() {
    this.location.back();
  }

}

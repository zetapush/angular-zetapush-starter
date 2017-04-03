import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'zp-not-found-view',
  templateUrl: './not-found-view.component.html',
  styles: [`

  `]
})
export class NotFoundViewComponent {

  constructor(private location: Location) { }

  onBackClick() {
    this.location.back();
  }

}

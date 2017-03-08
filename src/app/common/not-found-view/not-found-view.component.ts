import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'zp-not-found-view',
  templateUrl: './not-found-view.component.html',
  styles: [`

  `]
})
export class NotFoundViewComponent implements OnInit {

  constructor(private location: Location) { }

  ngOnInit() { }

  onBackClick() {
    this.location.back();
  }

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'zp-list-user-view',
  templateUrl: './list-user-view.component.html',
  styles: [`

  `]
})
export class ListUserViewComponent implements OnInit {

  users: Array<any> = [];

  constructor() { }

  ngOnInit() {
  }

}

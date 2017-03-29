import { Component, OnInit } from '@angular/core';
import { ZetaPushClient } from '../../zetapush';
import { services } from 'zetapush-js';
import { UnlockingApi } from '../unlocking-api.service';

@Component({
  selector: 'zp-unlocking-layout',
  templateUrl : './unlocking-layout.component.html',
  styleUrls: ['unlocking-layout.component.css']
})
export class UnlockingLayoutComponent implements OnInit {

  constructor(private api: UnlockingApi) { }

  private unlockTheGate() {
    this.api.unlockTheGate().then(( res ) => {
      console.log("Macroscript unlockTheGate called", res);
    } , (errors) => {
      console.error("Error the unlockTheGate", errors);
    });
  }

  ngOnInit() {
    this.unlockTheGate();
  }

}

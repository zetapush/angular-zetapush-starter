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

  text_message = '';

  constructor(private api: UnlockingApi) { }

  private unlockTheGate() {
    this.api.unlockTheGate().then(( output ) => {
      console.log("UnlockingLayoutComponent::unlockTheGate", output);
      if (output['res'] == 200 || output['res'] == 400){
        console.log("UnlockingLayoutComponent::unlockTheGate => Success request");
        this.text_message = "Great ! The gate is now unlocked";
      } else {
        console.error("UnlockingLayoutComponent::unlockTheGate => Error in the request")
        this.text_message = "Error in the request, the gate is locked";
      }
      

    } , (errors) => {
      console.error("UnlockingLayoutComponent::unlockTheGate", errors);
    });
  }

  ngOnInit() {
    this.unlockTheGate();
  }

}

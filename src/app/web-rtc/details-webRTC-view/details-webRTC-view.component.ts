import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WebRTCApi } from '../';

@Component({
  selector: 'zp-details-webRTC-view',
  templateUrl: './details-webRTC-view.component.html',
  styles: []
})
export class DetailsWebRTCViewComponent implements OnInit {

  constructor(private route: ActivatedRoute, private wApi: WebRTCApi) {}

  ngOnInit() {
  }
}

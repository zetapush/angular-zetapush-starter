import { Component, OnInit, OnDestroy } from '@angular/core';
import { WebRtcService, photoObject } from '../webRTC-service/webRTC.service';
import { Subscription }   from 'rxjs/Subscription';
// TODO Refactor with Lerna
import { User } from '../../user';

@Component({
  selector: 'zp-webRTC-view',
  templateUrl: 'webRTC-view.component.html',
  styles: []
})

export class WebRTCViewComponent implements OnInit, OnDestroy {

  // Variables
  localVideo: HTMLVideoElement;
  loginUser: string;
  otherNameInput: string;
  message: string;
  photos: any;
  subscription: Subscription;
  tabOfUrl: Array<photoObject> = [];

  constructor(private webRtc: WebRtcService) {
    this.photos = webRtc.photos;
    this.subscription = webRtc.photosChange.subscribe((value) => {
      this.photos = value;
      this.tabOfUrl = [];

      this.photos.forEach(element => {
        let photo : photoObject = {
          'file': element['url']['url'],
          'timestamp': element['creation'],
          'name': element['name']
        }
        this.tabOfUrl.push(photo);
      });
    });
  }

  ngOnInit(): void {
    
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  takePhoto(): void {
    this.webRtc.takePhoto();  
  }

  askPermissionPhoto(): void {
    this.webRtc.permissionPhotoFunction("ask");
  }
}
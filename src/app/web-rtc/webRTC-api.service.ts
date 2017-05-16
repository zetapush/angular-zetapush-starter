import { NgZone } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Api, ZetaPushClient, createApi } from 'zetapush-angular';

// TODO Refactor with Lerna
import { Metadata } from '../core';
// TODO Refactor with Lerna
import { Group } from '../group/';


export interface WebRtcMessage {
    type: string;
    data: any;
    src: string;
    dest: string;  
}


// TODO Should be auto-generated
export class WebRTCApi extends Api {

    onAnswer: Observable<WebRtcMessage>;
    onCandidate: Observable<WebRtcMessage>;
    onOffer: Observable<WebRtcMessage>;
    onOrderTakePhoto: Observable<string>;
    onListPictures: Observable<Array<string>>;
    onDisconnection: Observable<WebRtcMessage>;
    onDeletePhoto: Observable<string>;
    onAskForVideoCall: Observable<string>;
    onPermissionPhoto: Observable<string>;

    answer(answer: WebRtcMessage): Promise<WebRtcMessage> {
        return this.$publish('answer', { answer });
    }

    candidate(candidate: WebRtcMessage): Promise<WebRtcMessage> {
        return this.$publish('candidate', { candidate });
    }

    offer(offer: WebRtcMessage): Promise<WebRtcMessage> {
        return this.$publish('offer', { offer });
    }

    orderTakePhoto(destinataire: string, order: string): Promise<string> {
        return this.$publish('orderTakePhoto', { destinataire, order });
    }

    listPictures(): Promise<Array<string>> {
        return this.$publish('listPictures', {});
    }

    disconnection(disconnection: WebRtcMessage): Promise<WebRtcMessage> {
        return this.$publish('disconnection', { disconnection });
    }

    deletePhoto(path: string): Promise<string> {
        return this.$publish('deletePhoto', { path });
    }

    askForVideoCall(destinataire: string, order: string, owner: string, room: string): Promise<string> {
        return this.$publish('askForVideoCall', { destinataire, order, owner, room });
    }

    permissionPhoto(destinataire: string, order: string): Promise<string> {
        return this.$publish('permissionPhoto', { destinataire, order});
    }

}

export function WebRTCApiFactory(client: ZetaPushClient, zone: NgZone): WebRTCApi {
  return createApi(client, zone, WebRTCApi) as WebRTCApi;
}

export const WebRTCApiProvider = {
  provide: WebRTCApi, useFactory: WebRTCApiFactory, deps: [ ZetaPushClient, NgZone ]
};
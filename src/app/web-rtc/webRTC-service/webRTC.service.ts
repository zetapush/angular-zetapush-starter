import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { WebRtcMessage, WebRTCApi } from '../webRTC-api.service';
import { UserApi } from '../../user/user-api.service';
import { Router } from '@angular/router';
import { FileUpload } from '../../file/file-upload.service';
import { PlatformLocation } from '@angular/common'

export interface photoObject {
  file: string;
  timestamp: number;
  name: string;
}


@Injectable()
export class WebRtcService {

    // Variables
    conf = { 'iceServers': [{ 'url':'stun:stun.1.google.com:19302' }]};         // Conf of stun servers
    pc;                                                                         // Peer connection
    src: string;                                                                // userKey src
    dest: string;                                                               // userKey destinataire
    stream;                                                                     // Video stream
    photos: any;                                                                // All photos of the conversation
    photosChange: Subject<string> = new Subject<string>();                      // Detect new photos
    remoteStream;                                                               // Remote stream
    localVideo;                                                         
    remoteVideo;
    picture;                                                                    // The photo just taken
    initiator = false;                                                          // Detect if the client init the communication
    owner;                                                                      // Owner of the conversation
    room;                                                                       // Room of the conversation

    constructor(
        private api: WebRTCApi, 
        private user: UserApi, 
        private router: Router,
        private upload: FileUpload,
        private location: PlatformLocation){

        
        // Detect the back return on the page
        location.onPopState(() => {
            this.stopWebRTC();
            this.router.navigate(['conversation/details/', this.owner, this.room]);
        });


        //  =======================================================================================
        //                                      HANDLES ZETAPUSH     
        //  =======================================================================================
        api.onDeletePhoto.subscribe((message) => {
            console.log('WebRtcService::onDeletePhoto', message);
            this.listPhotos();
        })

        api.onOrderTakePhoto.subscribe((message) => {
            
            console.log('WebRtcService::onOrderTakePhoto', message);
            
            switch(message['order']){
                case 'take':
                    console.log("Take a photo");
                    let video = <HTMLVideoElement>document.getElementById('localVideo');

                    let canvas = document.createElement('canvas');
                    canvas.width = video.videoWidth;
                    canvas.height = video.videoHeight;

                    let context = canvas.getContext('2d');
                    context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
                    canvas.toBlob((blob) => {
                        this.picture = blob;
                        
                        // Send the picture
                        let file = this.upload.add({
                            folder: '/',
                            owner: this.room,
                            file: this.picture
                        });
                        this.upload.request(file)
                            .then((request) => {
                            console.log('FileUploadComponent::onRequest', request);
                            return this.upload.upload(request);
                            })
                                .then((request) => {
                                console.log('FileUploadComponent::onUpload', request);
                                return this.upload.confirm(request);
                                })
                                    .then((request) => {
                                    console.log('FileUploadComponent::onConfirm', request);
                                    
                                    // Signal new photo updated
                                    this.api.orderTakePhoto(this.dest, "newPhoto");
                        });
                    })
                    break;

                case 'newPhoto':
                    console.log('New photo updated');
                    this.listPhotos();
                    break;

                default:
                    console.log("Can't read the order: ", message['order']);
            }
        })

        api.onListPictures.subscribe((message) => {
            console.log('WebRtcService::onListPictures', message);
            this.photos = message['listing']['entries']['content'];
            this.photosChange.next(this.photos);
        })

        api.onDisconnection.subscribe((message) => {
            console.log("Disconnection");

            // Clear the video tag
            let video = <HTMLVideoElement>document.getElementById('remoteVideo');
            if (video != null && video.srcObject != null){
                video.pause();
                video.srcObject.getTracks().forEach(t => t.stop());
                video.load();
            }

            if (this.pc != null && this.pc.signalingState != "closed") {
                this.pc.removeStream(this.stream);
                this.pc.close();
            }
        })

        api.onAnswer.subscribe((message) => {
            console.log('WebRtcService::onAnswer', message);
            this.pc.setRemoteDescription(new RTCSessionDescription(message['res']['data']));
        })

        api.onOffer.subscribe((message) => {
            console.log('WebRtcService::onOffer', message);
            this.dest = message['res']['src'];
            this.pc.setRemoteDescription(new RTCSessionDescription(message['res']['data']));
            
            this.pc.createAnswer((answer) => {
                this.pc.setLocalDescription(answer);

                let message = {
                            'type': 'answer',
                            'data': answer,
                            'src': this.src,
                            'dest': this.dest
                        };
                this.api.answer(message);
            }, (error) => {
                console.error("Error during onOffer: ", error);
            });
        })

        api.onCandidate.subscribe((message) => {
            console.log('WebRtcService::onCandidate', message);
            this.pc.addIceCandidate(new RTCIceCandidate(message['res']['data']));
        })

        api.onAskForVideoCall.subscribe((message) => {
            console.log('WebRtcService::onAskForVideoCall', message);

            this.dest = message['res']['src'];
            this.room = message['res']['room'];
            this.owner = message['res']['owner'];

            if (message['res']['order'] == "ask"){
                if (confirm('Start a video communication ?')) {
                    this.initiator = true;
                    this.askForVideoCall(this.dest, 'ok', this.owner, this.room);
                    this.router.navigate(['webrtc/', this.owner, this.room]);
                    this.init();
                } else {
                    this.askForVideoCall(message['res']['src'], 'no', this.owner, this.room);
                }
            } else if (message['res']['order'] == "no"){
                alert("The member refused the video communication.");
                this.router.navigate(['conversation/details/', this.owner, this.room]);
            }
        })
    }

    /**
     * =================================================================
     *                          Init
     * =================================================================
     */
    init(): void {

        this.user.getUser({}).then( (user) => {
            this.src = user.userKey;
            this.startLocalVideo();
        });
    }


    /**
     * =================================================================
     *                  Start local video
     * =================================================================
     */
    startLocalVideo(): void {

        // Start the local video
        navigator.getUserMedia = navigator.getUserMedia;

        if (navigator.getUserMedia != undefined){
            navigator.getUserMedia({ video: true, audio:true}, (stream) => {
                this.localVideo = <HTMLVideoElement>document.getElementById('localVideo');
                this.stream = stream;
                //inserting our stream to the video tag     
                this.localVideo.srcObject =  stream;

                // Start the peer connection when the local video is running
                this.initPeerConnection();

            }, function(err){});
        } else {
            console.log("WebRTC not supported");
        }
    }

    /**
     * =================================================================
     *                  Init the Peer connection
     * =================================================================
     */
    initPeerConnection(): void {

        this.pc = new RTCPeerConnection(this.conf);
        this.pc.addStream(this.stream);

        // Configure handler ices candidates
        this.pc.onicecandidate = ((event) => {
            // Create candidate message
            let message = {
                'type': 'candidate',
                'data': event.candidate,
                'src': this.src,
                'dest': this.dest
            };
            this.api.candidate(message);
        });

        this.pc.oniceconnectionstatechange = (event) => {
            // To start the video when the this is a reconnection
            if (this.pc != null && this.pc.iceConnectionState === "checking"){
                this.createOffer();
            }
        }



        // Configure handler new stream
        this.pc.onaddstream = ((event) => {
            console.log("onAddStream");
            
            this.remoteVideo = <HTMLVideoElement>document.getElementById('remoteVideo');
            this.remoteStream = event.stream;
            this.remoteVideo.srcObject = event.stream;
        });

        // Get all pictures
        this.listPhotos();

        if (this.initiator){
            this.createOffer();
        }
    }

    /**
     * =================================================================
     *                  Stop the communication
     * =================================================================
     */
    stopWebRTC(): void {

        // Clear the local video tag
        if (this.localVideo != null && this.localVideo.srcObject != null) {
            this.localVideo.pause();
            this.localVideo.srcObject.getTracks().forEach(t => t.stop());
            this.localVideo.load();
        }

        // Clear the remote video tag
        if (this.remoteVideo != null && this.remoteVideo.srcObject != null) {
            this.remoteVideo.pause();
            this.remoteVideo.srcObject.getTracks().forEach(t => t.stop());
            this.remoteVideo.load();
        }

        if (this.pc != null && this.pc.signalingState != "closed") {
            this.pc.removeStream(this.stream);
            this.pc.close();
        }

        //this.api.disconnection({'data':'', 'type':'disconnection', 'src':this.src, 'dest':this.dest});
    }

    /**
     * ==================================================================
     *                 Create an offer to the destinataire
     * ==================================================================
     */
    createOffer(): void {

        // Create the offer
        this.pc.createOffer((offer) => {
        
            let message = {
                'type': 'offer',
                'data': offer,
                'src': this.src,
                'dest': this.dest
            };

            this.api.offer(message);
            this.pc.setLocalDescription(offer);
            
        }, (error) => {
            console.error("Error during create offer :", error);
        });
    }


    askForVideoCall(destinataire: string, order: string, owner: string, room: string): void {

        // Start the communication when we init the communication
        if (order == "ask"){
            this.init();
        }
        
        this.dest = destinataire;
        this.api.askForVideoCall(destinataire, order, owner, room);
    }



    /**
     * ==================================================================
     *                          Photo
     * ==================================================================
     */
    listPhotos(): void {
        this.api.listPictures();
    }

    deletePhoto(path: string): void {
        this.api.deletePhoto(path);
    }

    takePhoto(): void {
        this.api.orderTakePhoto(this.dest, "take");
    }




    startCommunication(): void {
        this.init();
    }
    
}
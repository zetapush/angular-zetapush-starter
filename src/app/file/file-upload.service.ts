import { Injectable } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Subject } from 'rxjs/Subject';
import { ZetaPushClient } from 'zetapush-angular';

import { FileApi } from './file-api.service';

enum FileUploadStatus {
  QUEUING,
  REQUESTED,
  TRANSFERING,
  TRANSFERED,
  CONFIRMED
}

interface FileUploadTransfer {
  guid: string;
  httpMethod: string;
  owner: string;
  url: string;
}

export interface FileUploadRequest {
  id: string;
  contentType: string;
  file: any;
  folder: string;
  owner: string;
  progress: Subject<number>;
  proxy: SafeUrl;
  status: FileUploadStatus;
  transfer?: FileUploadTransfer;
}

@Injectable()
export class FileUpload {

  private queue: Array<FileUploadRequest> = [];

  constructor(private api: FileApi, private client: ZetaPushClient, private sanitizer: DomSanitizer) { }

  add({ file, folder, owner }: { file: any, folder: string, owner: string }): FileUploadRequest {
    console.log('FileUpload::add', folder, file);
    const id = this.client.helper.getUniqRequestId();
    const contentType = file.type;
    const request = {
      id,
      contentType,
      file,
      folder,
      owner,
      proxy: this.getProxyFileUrl(file),
      progress: new Subject<number>(),
      status: FileUploadStatus.QUEUING
    };
    this.queue.push(request);
    return request;
  }

  confirm(request: FileUploadRequest): Promise<FileUploadRequest> {
    console.log('FileUpload::confirm', request);
    const { transfer } = request;
    return this.api.confirmFileUpload({
      guid: transfer.guid,
      owner: request.owner,
      actions: {},
      metadata: {
        name: request.file.name
      },
      tags: []
    }).then((result) => {
      console.log('FileUpload::onConfirmFileUpload', result);
      request.status = FileUploadStatus.CONFIRMED;
      return request;
    }, (errors) => {
      console.error('FileUpload::onConfirmFileUpload', errors);
    });
  }

  request(request: FileUploadRequest): Promise<FileUploadRequest> {
    console.log('FileUpload::request', request);
    return this.api.requestFileUpload(request).then((transfer) => {
      console.log('FileUpload::onRequestFileUpload', transfer);
      request.status = FileUploadStatus.REQUESTED;
      request.transfer = transfer;
      return request;
    }, (errors) => {
      console.error('FileUpload::onRequestFileUpload', errors);
    });
  }

  upload(request: FileUploadRequest): Promise<FileUploadRequest>  {
    console.log('FileUpload::upload', request);
    request.status = FileUploadStatus.TRANSFERING;
    return new Promise<FileUploadRequest>((resolve, reject) => {
      const { guid, httpMethod, owner, url } = request.transfer;
      const payload = request.file;
      const xhr = new XMLHttpRequest();
      xhr.addEventListener('readystatechange', (e) => {
        if (4 === xhr.readyState ) {
          if (200 <= xhr.status && xhr.status < 300) {
            request.status = FileUploadStatus.TRANSFERED;
            request.progress.complete();
            resolve(request);
          } else {
            request.status = FileUploadStatus.QUEUING;
            request.transfer = null;
            reject(request);
          }
        }
      }, false);
      xhr.upload.addEventListener('progress', (e: any) => {
        const done = e.position || e.loaded;
        const total = e.totalSize || e.total;
        const progression = Math.floor(done / total * 1000) / 10;
        console.log('xhr.upload progress: ' + done + ' / ' + total + ' = ' + (Math.floor(done / total * 1000) / 10) + '%');
        request.progress.next(progression);
      }, false);
      xhr.open(httpMethod, url, true);
      xhr.setRequestHeader('Content-Type', request.contentType);
      xhr.send(payload);
      request.progress.next(0);
    });
  }

  private getProxyFileUrl(file: any) {
    return this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(file));
  }
}

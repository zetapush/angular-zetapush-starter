import { Component, EventEmitter, Input, Output } from '@angular/core';

import { FileUpload, FileUploadRequest } from '../file-upload.service';

@Component({
  selector: 'zp-file-upload',
  template: `
    <zp-ui-file (files)="onSelectFiles($event)"></zp-ui-file>
  `,
  styles: [`

  `]
})
export class FileUploadComponent {

  @Input() folder: string;
  @Input() owner: string;

  @Output() added = new EventEmitter<FileUploadRequest>();
  @Output() requested = new EventEmitter<FileUploadRequest>();
  @Output() uploaded = new EventEmitter<FileUploadRequest>();
  @Output() confirmed = new EventEmitter<FileUploadRequest>();

  constructor(private upload: FileUpload) { }

  onSelectFiles(files: Array<any>) {
    console.log('FileUploadComponent::onSelectFiles', files);
    files.forEach((file) => {
      const request = this.upload.add({
        folder: this.folder,
        owner: this.owner,
        file
      });
      this.added.emit(request);
      this.upload.request(request)
        .then((request) => {
          console.log('FileUploadComponent::onRequest', request);
          this.requested.emit(request);
          return this.upload.upload(request);
        })
        .then((request) => {
          console.log('FileUploadComponent::onUpload', request);
          this.uploaded.emit(request);
          return this.upload.confirm(request);
        })
        .then((request) => {
          console.log('FileUploadComponent::onConfirm', request);
          this.confirmed.emit(request);
        });
    });
  }

}

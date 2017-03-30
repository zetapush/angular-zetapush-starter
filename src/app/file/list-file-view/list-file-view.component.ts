import { Component, OnInit } from '@angular/core';

import { FileApi } from '../file-api.service';
import { FileUpload, FileUploadRequest } from '../file-upload.service';

@Component({
  selector: 'zp-list-file-view',
  template: `
    <h1>list-file-view</h1>
    <zp-ui-file (files)="onSelectFiles($event)"></zp-ui-file>
    <h3 [attr.contenteditable]="contenteditable" (blur)="onChangeFolder($event)">{{ folder }}</h3>
    <ul class="Requests">
      <li *ngFor="let request of requests">
        <span>{{request.id}}</span>
        <progress [attr.value]="request.progress | async" max="100"></progress>
        <img [attr.src]="request.proxy" [attr.title]="request.file.name" height="150" />
      </li>
    </ul>
    <ul class="Entries">
      <li *ngFor="let entry of entries">
        <span (click)="onDeleteFile(entry.url.path)">{{entry.metadata.name}}</span>
        <img [attr.src]="entry.url.url" [attr.title]="entry.metadata.name" height="150" />
      </li>
    </ul>
    <pre *ngIf="result" class="Result">{{ result | json }}</pre>
    <pre *ngIf="errors.length" class="Errors">{{ result | json }}</pre>
  `,
  styles: [`
    :host {
      padding: 1rem;
    }
    h3 {
      margin: 1rem 0;
      border: 1px dashed blue;
    }
    .Requests {
      margin: 1rem 0;
      border: 1px dashed grey;
    }
    .Entries {
      margin: 1rem 0;
      border: 1px dashed orange;
    }
    .Result {
      margin: 1rem 0;
      border: 1px dashed green;
    }
    .Errors {
      margin: 1rem 0;
      border: 1px dashed red;
    }
  `]
})
export class ListFileViewComponent implements OnInit {

  contenteditable = true;
  errors: Array<any> = [];
  entries: Array<any> = [];
  requests: Array<FileUploadRequest> = [];
  folder = '/';
  result: any = {};

  constructor(private api: FileApi, private upload: FileUpload) {
    window['FileApi'] = api;
  }

  ngOnInit() {
    this.getFileEntryList();
  }

  getFileEntryList() {
    this.api.getFileEntryList({
      folder: this.folder
    }).then((result) => {
      console.log('ListFileViewComponent::onGetFileEntryList', result);
      this.entries = result.entries.content;
      this.result = result;
    }, (errors) => {
      console.error('ListFileViewComponent::onGetFileEntryList', errors);
    });
  }

  onChangeFolder(event) {
    console.log('ListFileViewComponent::onChangeFolder', event);
    this.folder = event.target.innerText.trim();
    this.getFileEntryList();
  }

  onDeleteFile(path) {
    console.log('ListFileViewComponent::onDeleteFile', path);

    this.api.deleteFileEntry({ path }).then((result) => {
      console.log('ListFileViewComponent::onDeleteFileEntry', result);
      this.getFileEntryList();
    }, (errors) => {
      console.error('ListFileViewComponent::onDeleteFileEntry', errors);
    });
  }

  onSelectFiles(files: Array<any>) {
    console.log('ListFileViewComponent::onSelectFiles', files);

    files.forEach((file) => {
      const request = this.upload.add(this.folder, file);
      this.requests.push(request);
      this.upload.request(request)
        .then((request) => {
          console.log('ListFileViewComponent::onAdd', request);
          return this.upload.upload(request);
        })
        .then((request) => {
          console.log('ListFileViewComponent::onUpload', request);
          return this.upload.confirm(request);
        })
        .then((request) => {
          console.log('ListFileViewComponent::onConfirm', request);
          return this.getFileEntryList();
        });
    });
  }
}

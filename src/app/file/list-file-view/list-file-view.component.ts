import { Component, OnInit } from '@angular/core';

import { services } from 'zetapush-js';

import { ZetaPushClient } from '../../zetapush';

import { FileApi, File } from '../file-api.service';
import { FileUploadRequest } from '../file-upload.service';

interface ViewFileEntry {
  file?: File;
  request?: FileUploadRequest;
}

@Component({
  selector: 'zp-list-file-view',
  template: `
    <h1>list-file-view</h1>
    <zp-file-upload [folder]="folder" (added)="onRequestAdded($event)" (confirmed)="onRequestConfirmed($event)"></zp-file-upload>
    <h3 [attr.contenteditable]="contenteditable" (blur)="onChangeFolder($event)">{{ folder }}</h3>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Image(Local)</th>
          <th>Progress</th>
          <th>Image(Remote)</th>
          <th>Thumnails(Remote)</th>
          <th>Debug</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let entry of entries">
          <td>{{entry.file ? entry.file.metadata.name : entry.request.file.name}}</td>
          <td [style.text-align]="'center'">
            <img *ngIf="entry.request" [attr.src]="entry.request.proxy" [attr.title]="entry.request.file.name" height="150" />
          </td>
          <td>
            <progress *ngIf="entry.request" [attr.value]="entry.request.progress | async" max="100"></progress>
          </td>
          <td [style.text-align]="'center'">
            <img *ngIf="entry.file" (click)="onDeleteFile(entry.file.url.path)" [attr.src]="entry.file.url.url" [attr.title]="entry.file.metadata.name" height="150" />
          </td>
          <td [style.text-align]="'center'">
            <img *ngFor="let thumbnail of entry.file?.thumbnails" [attr.src]="thumbnail.url" [attr.title]="entry.file?.metadata.name" [attr.height]="thumbnail.height">
          </td>
          <td>
            {{ entry?.file?.metadata | json }}
          </td>
        </tr>
      </tbody>
    </table>
  `,
  styles: [`
    :host {
      padding: 1rem;
    }
    h3 {
      margin: 1rem 0;
      border: 1px dashed blue;
    }
    .Entries {
      margin: 1rem 0;
      border: 1px dashed orange;
    }
  `]
})
export class ListFileViewComponent implements OnInit {

  contenteditable = true;
  entries: Array<ViewFileEntry> = [];
  folder = '/';
  owner: string;

  constructor(private api: FileApi, private client: ZetaPushClient) {
    // Get owner
    this.owner = api.$getUserId();
    // Create callback service
    client.createService({
      Type: services.Macro,
      deploymentId: 'macro_1',
      listener: {
        core_file__onThumbnailCallback: (message) => {
          console.log('core_file__onThumbnailCallback', message);
          this.getFileEntryList();
        }
      }
    });
  }

  ngOnInit() {
    this.getFileEntryList();
  }

  getFileEntryList() {
    this.api.getFileEntryList({
      folder: this.folder
    }).then((result) => this.onGetFileEntryList(result), (errors) => {
      console.error('ListFileViewComponent::onGetFileEntryList', errors);
    });
  }

  onGetFileEntryList(result) {
    console.log('ListFileViewComponent::onGetFileEntryList', result);
    // Clean deleted elements
    for (let i = 0; i < this.entries.length; ++i) {
      const entry = this.entries[i];
      if (entry.file) {
        const found = result.entries.content.find((file: File) => {
          return file.name === entry.file.name;
        });
        if (!found) {
          this.entries.splice(i, 1);
          --i;
        }
      }
    }
    // Manage updates Merge data from
    result.entries.content.forEach((file: File) => {
      const THUMBNAIL_PROPERTY_PATTERN = /thumb\-([0-9]+)/;
      if (!file.thumbnails) {
          file.thumbnails = [];
        for (let property in file.metadata) {
          if (file.metadata.hasOwnProperty(property) && THUMBNAIL_PROPERTY_PATTERN.test(property)) {
            const value = file.metadata[property];
            const [, height ] = THUMBNAIL_PROPERTY_PATTERN.exec(property);
            file.thumbnails.push({
              ...value,
              height: parseInt(height, 10)
            });
          }
        }
      }
      const entry = this.entries.find((element) => {
        return element.request && element.request.transfer ? element.request.transfer.guid === file.name : false;
      });
      if (entry) {
        entry.file = file;
      } else {
        this.entries = [ { file }, ...this.entries ];
      }
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

  onRequestAdded(request: FileUploadRequest) {
    console.log('ListFileViewComponent::onRequestAdded', request);

    this.entries = [ { request }, ...this.entries ];
  }

  onRequestConfirmed(request: FileUploadRequest) {
    console.log('ListFileViewComponent::onRequestAdded', request);

    return this.getFileEntryList();
  }

}

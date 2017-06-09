import { Component, Input } from '@angular/core';

import { File } from '../file-api.service';
import { FileUploadRequest } from '../file-upload.service';

interface ViewFileEntry {
  file?: File;
  request?: FileUploadRequest;
}

@Component({
  selector: 'zp-file-list',
  template: `
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Image(Local)</th>
          <th>Progress</th>
          <th>Image(Remote)</th>
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
            <img *ngIf="entry.file" [attr.src]="entry.file.url.url" [attr.title]="entry.file.metadata.name" height="150" />
          </td>
          <td>
            {{ entry?.file?.metadata | json }}
          </td>
        </tr>
      </tbody>
    </table>
  `,
  styles: [],
})
export class FileListComponent {
  @Input() entries: Array<ViewFileEntry> = [];
}

import { Component, OnInit } from '@angular/core';

import { FileApi } from './../file-api.service';

@Component({
  selector: 'zp-list-file-view',
  template: `
    <h1>list-file-view</h1>
    <h3 [attr.contenteditable]="contenteditable" (blur)="onChangeFolder($event)">{{ folder }}</h3>
    <pre *ngIf="result" class="Result">{{ result | json }}</pre>
    <pre *ngIf="errors.length" class="Errors">{{ result | json }}</pre>
  `,
  styles: [`
    :host {
      padding: 1rem;
    }
    h3 {
      border: 1px dashed blue;
    }
    .Result {
      border: 1px dashed green;
    }
    .Errors {
      border: 1px dashed red;
    }
  `]
})
export class ListFileViewComponent implements OnInit {

  contenteditable = true;
  errors: Array<any> = [];
  folder = '/';
  result: any = {};

  constructor(private api: FileApi) {
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
      this.result = result;
    }, (errors) => {
      console.error('ListFileViewComponent::onGetFileEntryList', errors);
    });
  }

  onChangeFolder($event) {
    console.log('ListFileViewComponent::onChangeFolder', $event);
    this.folder = $event.target.innerText.trim();
    this.getFileEntryList();
  }
}

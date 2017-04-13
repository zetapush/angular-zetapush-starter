import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// TODO Refactor with Lerna
import { CoreModule } from '../core';
// TODO Refactor with Lerna
import { UserModule } from '../user';
// TODO Refactor with Lerna
import { UiModule } from '../ui';

import { FileRoutingModule } from './file-routing.module';

import { FileApiProvider } from './file-api.service';
import { FileUpload } from './file-upload.service';

import { FileLayoutComponent } from './file-layout/file-layout.component';

import { ListFileViewComponent } from './list-file-view/list-file-view.component';
import { DetailsFileViewComponent } from './details-file-view/details-file-view.component';
import { DetailsFileComponent } from './details-file/details-file.component';
import { FileListComponent } from './file-list/file-list.component';
import { FileUploadComponent } from './file-upload/file-upload.component';

@NgModule({
  declarations: [
    FileLayoutComponent,
    ListFileViewComponent,
    DetailsFileViewComponent,
    DetailsFileComponent,
    FileListComponent,
    FileUploadComponent
  ],
  exports: [
    FileRoutingModule,

    DetailsFileComponent,
    FileUploadComponent
  ],
  imports: [
    CommonModule,
    FormsModule,

    CoreModule,
    UiModule,
    UserModule,

    FileRoutingModule
  ],
  providers: [
    FileApiProvider,
    FileUpload
  ]
})
export class FileModule { }

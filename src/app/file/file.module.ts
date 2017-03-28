import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

// TODO Refactor with Lerna
import { CoreModule } from '../core';

import { FileRoutingModule } from './file-routing.module';

import { FileApiProvider } from './file-api.provider';

import { FileLayoutComponent } from './file-layout/file-layout.component';

import { ListFileViewComponent } from './list-file-view/list-file-view.component';
import { DetailsFileViewComponent } from './details-file-view/details-file-view.component';
import { DetailsFileComponent } from './details-file/details-file.component';

@NgModule({
  declarations: [
    FileLayoutComponent,
    ListFileViewComponent,
    DetailsFileViewComponent,
    DetailsFileComponent
  ],
  exports: [
    FileRoutingModule,

    DetailsFileComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    FlexLayoutModule,

    CoreModule,

    FileRoutingModule
  ],
  providers: [
    FileApiProvider
  ]
})
export class FileModule { }

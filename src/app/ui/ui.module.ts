import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MdAutocompleteModule, MdButtonModule, MdCardModule, MdChipsModule, MdDialogModule, MdIconModule,
  MdInputModule, MdListModule, MdRadioModule, MdSidenavModule, MdToolbarModule
} from '@angular/material';

import { UiFileComponent } from './ui-file/ui-file.component';
import { UiErrorComponent } from './ui-error/ui-error.component';

const MATERIAL_MODULES = [
  NoopAnimationsModule,
  FlexLayoutModule,

  MdAutocompleteModule,
  MdButtonModule,
  MdCardModule,
  MdChipsModule,
  MdDialogModule,
  MdIconModule,
  MdInputModule,
  MdListModule,
  MdRadioModule,
  MdSidenavModule,
  MdToolbarModule
];

@NgModule({
  declarations: [
    UiErrorComponent,
    UiFileComponent
  ],
  imports: [
    CommonModule,
    ...MATERIAL_MODULES
  ],
  exports: [
    CommonModule,
    ...MATERIAL_MODULES,

    UiErrorComponent,
    UiFileComponent
  ],
  providers: [
  ]
})
export class UiModule {}

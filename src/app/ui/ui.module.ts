import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule,
  MatChipsModule,
  MatDialogModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatRadioModule,
  MatSidenavModule,
  MatToolbarModule,
} from '@angular/material';

import { UiFileComponent } from './ui-file/ui-file.component';
import { UiErrorComponent } from './ui-error/ui-error.component';

const MATERIAL_MODULES = [
  NoopAnimationsModule,
  FlexLayoutModule,

  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule,
  MatChipsModule,
  MatDialogModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatRadioModule,
  MatSidenavModule,
  MatToolbarModule,
];

@NgModule({
  declarations: [UiErrorComponent, UiFileComponent],
  imports: [CommonModule, ...MATERIAL_MODULES],
  exports: [
    CommonModule,
    ...MATERIAL_MODULES,

    UiErrorComponent,
    UiFileComponent,
  ],
  providers: [],
})
export class UiModule {}

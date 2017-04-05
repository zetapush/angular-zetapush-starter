import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@angular/material';

import { UiFileComponent } from './ui-file/ui-file.component';
import { UiErrorComponent } from './ui-error/ui-error.component';

@NgModule({
  declarations: [
    UiErrorComponent,
    UiFileComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
  ],
  exports: [
    UiErrorComponent,
    UiFileComponent
  ],
  providers: [
  ]
})
export class UiModule {}

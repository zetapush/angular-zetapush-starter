import { NgModule } from '@angular/core';
import { MaterialModule } from '@angular/material';

import { UiFileComponent } from './ui-file/ui-file.component';

@NgModule({
  declarations: [
    UiFileComponent
  ],
  imports: [
    MaterialModule,
  ],
  exports: [
    UiFileComponent
  ],
  providers: [
  ]
})
export class UiModule {}

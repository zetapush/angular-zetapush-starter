import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'zp-ui-file',
  template: `
    <form #form name="zp-ui-file-form">
      <input [attr.id]="id" type="file" name="file" (change)="onChange($event)" [attr.accept]="accept" [attr.multiple]="multiple" />
      <label [attr.for]="id"><mat-icon>image</mat-icon></label>
    </form>
  `,
  styles: [
    `
    :host {
      display: inline;
    }
    label[for] {
      cursor: pointer;
    }
    [name="file"] {
      display: block;
      overflow: hidden;
      appearance: none;
      width: 0;
      height: 0;
    }
  `,
  ],
})
export class UiFileComponent {
  protected static id = 0;

  id: string;

  @Input() accept = 'image/*';
  @Input() multiple = true;

  @Output() files = new EventEmitter<any>();

  @ViewChild('form') form: ElementRef;

  constructor() {
    this.id = `zp-ui-file--${++UiFileComponent.id}`;
  }

  onChange($event) {
    console.log('UiFileComponent::onChange', $event);

    const { files } = $event.target;

    this.files.emit(Array.from(files));

    this.form.nativeElement.reset();
  }
}

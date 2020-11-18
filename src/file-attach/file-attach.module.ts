import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileAttachComponent } from './components/file-attach.component';
import { DropzoneDirective } from './components/dropzone.directive';
import { ButtonModule } from '../button';
import { IconsModule } from '../icons';

@NgModule({
  declarations: [FileAttachComponent, DropzoneDirective],
  imports: [
    CommonModule,
    ButtonModule,
    IconsModule
  ],
  exports: [
    FileAttachComponent
  ]
})
export class FileAttachModule { }

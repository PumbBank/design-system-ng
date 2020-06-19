import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileAttachComponent } from './components/file-attach.component';
import { ButtonModule } from '../button';
import { IconsModule } from '../2-icons';

@NgModule({
  declarations: [FileAttachComponent],
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

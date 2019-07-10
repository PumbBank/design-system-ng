import { NgModule } from '@angular/core';
import { FileUploadDirective } from './directives/file-upload.directive';

@NgModule({
  declarations: [FileUploadDirective],
  exports: [FileUploadDirective]
})
export class FileUploadModule { }

import { HintControlDirective } from './hint-control.directive';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HintComponent } from './hint.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    HintComponent,
    HintControlDirective
  ],
  exports: [
    HintComponent,
    HintControlDirective
  ]
})
export class HintModule { }

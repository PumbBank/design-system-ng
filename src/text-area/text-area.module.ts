import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextAreaComponent } from './components/text-area/text-area.component';
import { AreaValueAccessorDirective } from './directives/area-value-accessor.directive';

@NgModule({
  declarations: [
    TextAreaComponent,
    AreaValueAccessorDirective
  ],
  imports: [
    CommonModule
  ], exports: [
    TextAreaComponent,
    AreaValueAccessorDirective
  ]
})

export class TextAreaModule { }

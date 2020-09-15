import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextAreaComponent } from './components/text-area/text-area.component';
import { AreaValueAccesorDirective } from './directives/area-value-accesor.directive';



@NgModule({
  declarations: [TextAreaComponent, AreaValueAccesorDirective],
  imports: [
    CommonModule
  ], exports: [TextAreaComponent, AreaValueAccesorDirective]
})
export class TextAreaModule { }

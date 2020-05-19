import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HintComponent } from './components/hint/hint.component';
import { HintControlDirective } from './directives/hint-control.directive';
import { IconsModule } from '../2-icons/icons.module';



@NgModule({
  declarations: [HintComponent, HintControlDirective],
  exports:  [HintComponent, HintControlDirective],
  imports: [
    CommonModule,
    IconsModule
  ]
})
export class MillHintModule { }

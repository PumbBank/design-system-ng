import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HintComponent } from './components/hint/hint.component';
import { HintControlDirective } from './directives/hint-control.directive';
import { IconsModule } from '../icons/icons.module';
import { SelectModule } from '../select';

@NgModule({
  declarations: [HintComponent, HintControlDirective],
  exports:  [HintComponent, HintControlDirective],
  imports: [
    CommonModule,
    IconsModule,
    SelectModule
  ]
})
export class MillHintModule { }

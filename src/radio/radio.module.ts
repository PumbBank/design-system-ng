import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RadioComponent } from './components/radio.component';
import { RadioOverviewComponent } from './examples/radio-page.component';
import { IconsModule } from '../icons/icons.module';
import { RadioValueAccessorDirective } from './directives/radio-value-accessor.directive';

// exports
// export {
//   RadioComponent,
// };

@NgModule({
  declarations: [
    RadioComponent,
    RadioValueAccessorDirective
  ],
  exports: [
    RadioComponent,
    RadioValueAccessorDirective
  ],
  imports: [
    CommonModule,
    IconsModule
  ]
})
export class RadioModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RadioComponent } from './components/radio.component';
import { RadioOverviewComponent } from './examples/radio-page.component';
import { IconsModule } from '../2-icons/icons.module';

// exports
// export {
//   RadioComponent,
// };

@NgModule({
  declarations: [
    RadioComponent,
  ],
  exports: [
    RadioComponent,
  ],
  imports: [
    CommonModule,
    IconsModule
  ]
})
export class RadioModule { }

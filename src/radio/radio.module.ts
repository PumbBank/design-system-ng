import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RadioComponent } from './components/radio.component';
import { RadioOverviewComponent } from './examples/radio-page.component';
import { IconsModule } from '../icons/icons.module';

// exports
export {
  RadioComponent,
};

@NgModule({
  declarations: [
    RadioComponent,
    RadioOverviewComponent
  ],
  exports: [
    RadioComponent,
    RadioOverviewComponent
  ],
  imports: [
    CommonModule,
    IconsModule
  ]
})
export class RadioModule { }

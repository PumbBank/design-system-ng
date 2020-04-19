import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RadioComponent } from './components/radio.component';
import { RadioOverviewComponent } from './examples/radio-page.component';

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
    CommonModule
  ]
})
export class RadioModule { }

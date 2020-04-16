import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RadioComponent } from './components/radio.component';
import { RadioChange } from './components/radio-change.class';
import { RadioOverviewComponent } from './examples/radio-page.component';

// exports
export {
  RadioComponent,
  RadioChange
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

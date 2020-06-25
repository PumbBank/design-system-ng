import { NgModule } from '@angular/core';
import { PinInputComponent } from './components/pin-input/pin-input.component';
import { CommonModule } from '@angular/common';
import { PinInputOverviewComponent } from './examples/pin-input-page.component';

@NgModule({
  declarations: [
    PinInputComponent,
    PinInputOverviewComponent
  ],
  exports: [
    PinInputComponent
  ],
  imports: [
    CommonModule
  ]
})

export class PinInputModule {

}

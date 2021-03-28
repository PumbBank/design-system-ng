import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { SpinnerOverviewComponent } from './examples/spinner-overview.component';

@NgModule({
  declarations: [
    SpinnerComponent,
    SpinnerOverviewComponent,
  ],
  exports: [
    SpinnerComponent
  ],
  imports: [
    CommonModule,
  ]
})
export class SpinnerModule {
}

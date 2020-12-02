import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutocompleteComponent } from './components/autocomplete/autocomplete.component';
import { SimplebarAngularModule } from 'simplebar-angular';
import { BoldPipe } from './pipes/bold.pipe';

@NgModule({
  declarations: [AutocompleteComponent, BoldPipe],
  exports: [AutocompleteComponent],
  imports: [
    CommonModule,
    SimplebarAngularModule
  ],
  entryComponents: [AutocompleteComponent]
})
export class AutocompleteModule { }

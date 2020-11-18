import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutocompleteComponent } from './components/autocomplete/autocomplete.component';
import { SimplebarAngularModule } from 'simplebar-angular';


@NgModule({
  declarations: [AutocompleteComponent],
  exports: [AutocompleteComponent],
  imports: [
    CommonModule,
    SimplebarAngularModule
  ],
  entryComponents: [AutocompleteComponent]
})
export class AutocompleteModule { }

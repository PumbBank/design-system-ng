import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchInputComponent } from './components/search-input/search-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchInputOverviewComponent } from './examples/search-input-overview/search-input-overview.component';

@NgModule({
  declarations: [
    SearchInputComponent,
    SearchInputOverviewComponent
  ],
  exports: [
    SearchInputComponent,
    SearchInputOverviewComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})

export class SearchInputModule {
}

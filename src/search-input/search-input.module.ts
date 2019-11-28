import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchInputComponent } from './components/search-input/search-input.component';
import { FormsModule } from '@angular/forms';

@NgModule({
	declarations: [
		SearchInputComponent,
	],
	exports: [
		SearchInputComponent
	],
	imports: [
		CommonModule,
		FormsModule
	]
})
export class SearchInputModule { }

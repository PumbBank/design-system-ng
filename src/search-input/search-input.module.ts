import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchInputComponent } from './components/search-input/search-input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
	declarations: [
		SearchInputComponent,
	],
	exports: [
		SearchInputComponent,
	],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
	]
})
export class SearchInputModule { }

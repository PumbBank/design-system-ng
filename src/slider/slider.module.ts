import 'hammerjs';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SliderComponent } from './components/slider/slider.component';


@NgModule({
	declarations: [
		SliderComponent
	],
	exports: [
		SliderComponent,
	],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
	],
})
export class SliderModule { }


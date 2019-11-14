import 'hammerjs';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SliderComponent } from './components/slider/slider.component';
import { SliderThumbComponent } from './components/slider/slider-thumb/slider-thumb.component';


@NgModule({
	declarations: [
		SliderComponent,
		SliderThumbComponent
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


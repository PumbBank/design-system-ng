import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BadgeComponent } from './components/badge/badge.component';


@NgModule({
	declarations: [BadgeComponent],
	exports: [BadgeComponent],
	imports: [
		CommonModule,
	],
})
export class BadgeModule { }


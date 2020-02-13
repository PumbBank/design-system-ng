import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BadgeComponent } from './components/badge/badge.component';
import { BadgeDirective } from './directive/badge.directive';


@NgModule({
	declarations: [BadgeComponent, BadgeDirective],
	exports: [BadgeComponent],
	imports: [
		CommonModule,
	],
})
export class BadgeModule { }


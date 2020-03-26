import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwitcherComponent } from './components/switcher/switcher.component';
import { SwitcherCircleComponent } from './components/switcher/switcher-circle/switcher-circle.component';
import { IconsModule } from '../icons/icons.module';



@NgModule({
	declarations: [
		SwitcherComponent,
		SwitcherCircleComponent
	],
	exports: [
		SwitcherComponent,
	],
	imports: [
		CommonModule,
    IconsModule
	],
})
export class SwitcherModule { }


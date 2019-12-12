import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsComponent } from './components/tabs/tabs.component';
import { TabContentComponent } from './components/tabs/tab/tab-content.component';


@NgModule({
	declarations: [
		TabsComponent,
		TabContentComponent,
	],
	exports: [
		TabsComponent,
		TabContentComponent,
	],
	imports: [
		CommonModule,
	],
})
export class TabsModule { }


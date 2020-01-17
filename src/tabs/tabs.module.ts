import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsComponent } from './components/tabs/tabs.component';
import { TabItemComponent } from './components/tabs/tab-content/tab-item.component';


@NgModule({
	declarations: [
		TabsComponent,
		TabItemComponent,
	],
	exports: [
		TabsComponent,
		TabItemComponent,
	],
	imports: [
		CommonModule,
	],
})
export class TabsModule { }


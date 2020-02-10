import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabsComponent } from './components/tabs/tabs.component';
import { TabItemComponent } from './components/tabs/tab-item/tab-item.component';
import { TabLabelComponent } from './components/tabs/tab-label/tab-label.component';


@NgModule({
	declarations: [
		TabsComponent,
		TabItemComponent,
		TabLabelComponent,
	],
	exports: [
		TabsComponent,
		TabItemComponent,
    TabLabelComponent
	],
	imports: [
		CommonModule,
	],
})
export class TabsModule { }


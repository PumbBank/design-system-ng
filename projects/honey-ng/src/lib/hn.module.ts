import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonComponent } from './components/button/button.component';
import { NavigationItemComponent } from './components/navigation/navigation-item/navigation-item.component';
import { FabComponent } from './components/fab/fab.component';
import { IconComponent } from './components/icon/icon.component';
import { InputModule } from './modules/input/input.module';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { ChipModule } from './modules/chip/chip.module';

@NgModule({
  imports: [
    CommonModule,
    InputModule,
    ChipModule
  ],
  declarations: [
    ButtonComponent,
    FabComponent,
    IconComponent,
    NavigationItemComponent,
    PageHeaderComponent
  ],
  exports: [
    ChipModule,
    InputModule,

    ButtonComponent,
    FabComponent,
    IconComponent,
    NavigationItemComponent,
    PageHeaderComponent
  ]
})
export class HnModule { }

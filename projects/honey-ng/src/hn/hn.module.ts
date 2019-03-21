import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonComponent } from './components/button/button.component';
import { NavigationItemComponent } from './components/navigation/navigation-item/navigation-item.component';
import { FabComponent } from './components/fab/fab.component';
import { IconComponent } from './components/icon/icon.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { InputModule } from '../input/input.module';
import { ChipModule } from '../chip/chip.module';
import { SidebarModule } from '../sidebar/sidebar.module';
import { TableModule } from '../table/table.module';

@NgModule({
  imports: [
    CommonModule,
    InputModule,
    ChipModule,
    SidebarModule,
    TableModule
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
    SidebarModule,
    TableModule,


    ButtonComponent,
    FabComponent,
    IconComponent,
    NavigationItemComponent,
    PageHeaderComponent
  ]
})
export class HnModule { }

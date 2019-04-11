import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavigationItemComponent } from './components/navigation/navigation-item/navigation-item.component';
import { FabComponent } from './components/fab/fab.component';
import { IconComponent } from './components/icon/icon.component';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { InputModule } from '../input/input.module';
import { ChipModule } from '../chip/chip.module';
import { SidebarModule } from '../sidebar/sidebar.module';
import { TableModule } from '../table/table.module';
import { SelectModule } from '../select/select.module';
import { ButtonModule } from '../button/button.module';

@NgModule({
  imports: [
    CommonModule,
    InputModule,
    ChipModule,
    SidebarModule,
    TableModule,
    SelectModule,
    ButtonModule
  ],
  declarations: [
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
    SelectModule,
    FabComponent,
    IconComponent,
    NavigationItemComponent,
    PageHeaderComponent
  ]
})
export class HnModule { }

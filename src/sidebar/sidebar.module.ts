import { NgModule } from '@angular/core';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { CommonModule } from '@angular/common';
import { UserInfoActionComponent } from './components/user-info-action/user-info-action.component';
import { NavItemComponent } from './components/nav-item/nav-item.component';
import { NavTitleComponent } from './components/nav-title/nav-title.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { IconsModule } from '../2-icons/icons.module';
import { BadgeModule } from '../badge/badge.module';

@NgModule({
  imports: [
    CommonModule,
    IconsModule,
    BadgeModule
  ],
  declarations: [
    UserInfoComponent,
    UserInfoActionComponent,
    NavItemComponent,
    NavTitleComponent,
    SidebarComponent
  ],
  exports: [
    UserInfoComponent,
    UserInfoActionComponent,
    NavItemComponent,
    NavTitleComponent,
    SidebarComponent
  ]
})
export class SidebarModule {

}

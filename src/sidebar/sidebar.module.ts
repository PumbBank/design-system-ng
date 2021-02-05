import { NgModule } from '@angular/core';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { CommonModule } from '@angular/common';
import { UserInfoActionComponent } from './components/user-info-action/user-info-action.component';
import { NavItemComponent } from './components/nav-item/nav-item.component';
import { NavTitleComponent } from './components/nav-title/nav-title.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { IconsModule } from '../icons/icons.module';
import { BadgeModule } from '../badge/badge.module';
import { NavContentHeadComponent } from './components/nav-content-head/nav-content-head.component';
import { NavContentComponent } from './components/nav-content/nav-content.component';
import { SidebarController } from './services/sidebar-cotroller.service';

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
    SidebarComponent,
    NavContentComponent,
    NavContentHeadComponent
  ],
  exports: [
    UserInfoComponent,
    UserInfoActionComponent,
    NavItemComponent,
    NavTitleComponent,
    SidebarComponent,
    NavContentComponent,
    NavContentHeadComponent
  ],
  providers: [
    SidebarController
  ]
})
export class SidebarModule {

}

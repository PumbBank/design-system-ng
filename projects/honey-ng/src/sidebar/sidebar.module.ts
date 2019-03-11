import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SidebarHeader } from './components/sidebar-header/sidebar-header.component';
import { SidebarTitleComponent } from './components/sidebar-title/sidebar-title.componnet';
import { SidebarButtonComponent } from './components/sidebar-button/sidebar-button.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    SidebarComponent,
    SidebarHeader,
    SidebarTitleComponent,
    SidebarButtonComponent
  ],
  exports: [
    SidebarComponent,
    SidebarHeader,
    SidebarTitleComponent,
    SidebarButtonComponent
  ]
})
export class SidebarModule {

}

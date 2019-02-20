import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ButtonComponent } from './components/button/button.component';
import { NavigationItemComponent } from './components/navigation/navigation-item/navigation-item.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { DialogBodyComponent } from './components/dialog/dialog-body/dialog-body.component';
import { DialogFooterComponent } from './components/dialog/dialog-footer/dialog-footer.component';
import { DialogHeaderComponent } from './components/dialog/dialog-header/dialog-header.component';
import { FabComponent } from './components/fab/fab.component';
import { IconComponent } from './components/icon/icon.component';
import { InputModule } from './modules/input/input.module';

@NgModule({
  imports: [
    CommonModule,
    InputModule
  ],
  declarations: [
    ButtonComponent,
    FabComponent,
    IconComponent,
    NavigationItemComponent,

    DialogComponent,
    DialogHeaderComponent,
    DialogBodyComponent,
    DialogFooterComponent
  ],
  exports: [
    InputModule,

    ButtonComponent,
    FabComponent,
    IconComponent,
    NavigationItemComponent,

    DialogComponent,
    DialogHeaderComponent,
    DialogBodyComponent,
    DialogFooterComponent
  ]
})
export class FuuiModule { }

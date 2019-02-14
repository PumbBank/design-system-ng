import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IconComponent } from './components/icon/icon.component';
import { ButtonComponent } from './components/button/button.component';
import { NavigationItemComponent } from './components/navigation/navigation-item/navigation-item.component';
import { InputComponent } from './components/input/input.component';
import { InputControlComponent } from './components/input/input-control.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { DialogBodyComponent } from './components/dialog/dialog-body/dialog-body.component';
import { DialogFooterComponent } from './components/dialog/dialog-footer/dialog-footer.component';
import { DialogHeaderComponent } from './components/dialog/dialog-header/dialog-header.component';
import { FabComponent } from './components/fab/fab.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ButtonComponent,
    FabComponent,
    IconComponent,
    InputComponent,
    InputControlComponent,
    NavigationItemComponent,

    DialogComponent,
    DialogHeaderComponent,
    DialogBodyComponent,
    DialogFooterComponent
  ],
  exports: [
    ButtonComponent,
    FabComponent,
    IconComponent,
    InputComponent,
    InputControlComponent,
    NavigationItemComponent,

    DialogComponent,
    DialogHeaderComponent,
    DialogBodyComponent,
    DialogFooterComponent
  ]
})
export class FuuiModule { }

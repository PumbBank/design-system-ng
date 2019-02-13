import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IconComponent } from './components/icon/icon.component';
import { ButtonComponent } from './components/button/button.component';
import { NavigationItemComponent } from './components/navigation/navigation-item/navigation-item.component';
import { InputComponent } from './components/input/input.component';
import { InputControlComponent } from './components/input/input-control.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ButtonComponent,
    IconComponent,
    InputComponent,
    InputControlComponent,
    NavigationItemComponent
  ],
  exports: [
    ButtonComponent,
    IconComponent,
    InputComponent,
    InputControlComponent,
    NavigationItemComponent
  ]
})
export class FuuiModule { }

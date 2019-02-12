import { IconComponent } from './components/icon/icon.component';
import { ButtonComponent } from './components/button/button.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    ButtonComponent,
    IconComponent
  ],
  exports: [
    ButtonComponent,
    IconComponent
  ]
})
export class FuuiModule { }

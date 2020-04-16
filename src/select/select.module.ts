import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SelectComponent } from './components/select/select.component';
import { SelectWithoutOptionSourceDirective } from './directives/without-option-source/select-without-option-source.directive';
import { SelectOptionDirective } from './directives/option/select-option.directive';
import { SelectValueAccessorDirective } from './directives/select-value-accessor/select-value-accessor.directive';
import { IconsModule } from 'src/icons/icons.module';
import { BadgeModule } from 'src/badge/badge.module';

import { SimplebarAngularModule } from 'simplebar-angular';

@NgModule({
  imports: [
    CommonModule,
    IconsModule,
    BadgeModule,
    SimplebarAngularModule
  ],
  declarations: [
    SelectComponent,
    SelectWithoutOptionSourceDirective,
    SelectOptionDirective,
    SelectValueAccessorDirective,
    
  ],
  exports: [
    SelectComponent,
    SelectWithoutOptionSourceDirective,
    SelectOptionDirective,
    SelectValueAccessorDirective
  ]
})
export class SelectModule { }

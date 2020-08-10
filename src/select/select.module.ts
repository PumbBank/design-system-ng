import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SelectComponent } from './components/select/select.component';
import { SelectWithoutOptionSourceDirective } from './directives/without-option-source/select-without-option-source.directive';
import { SelectOptionDirective } from './directives/option/select-option.directive';
import { SelectValueAccessorDirective } from './directives/select-value-accessor/select-value-accessor.directive';
import { IconsModule } from '../icons/icons.module';
import { BadgeModule } from '../badge/badge.module';

import { SimplebarAngularModule } from 'simplebar-angular';
import { CheckboxModule } from '../checkbox/checkbox.module';
import { ClickOutsideDirective } from './directives/click-outside/click-outside.directive';
import { FormGroupDirective } from '@angular/forms';
import { FormUtilsModule } from '../form-utils/form-utils.module';

@NgModule({
  imports: [
    CommonModule,
    IconsModule,
    BadgeModule,
    SimplebarAngularModule,
    FormUtilsModule,
    CheckboxModule
  ],
  declarations: [
    SelectComponent,
    SelectWithoutOptionSourceDirective,
    SelectOptionDirective,
    SelectValueAccessorDirective,
    ClickOutsideDirective

  ],
  exports: [
    SelectComponent,
    SelectWithoutOptionSourceDirective,
    SelectOptionDirective,
    SelectValueAccessorDirective
  ],
  providers: [FormGroupDirective]
})

export class SelectModule { }

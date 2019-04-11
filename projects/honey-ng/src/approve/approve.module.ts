import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApproveDirective } from './directives/approve.directive';
import { ApproveComponent } from './components/approve.component';
import { DialogModule } from 'projects/honey-ng/src/public_api';
import { ButtonModule } from '../button/button.module';

@NgModule({
  declarations: [
    ApproveDirective,
    ApproveComponent
  ],
  entryComponents: [
    ApproveComponent
  ],
  exports: [
    ApproveDirective
  ],
  imports: [
    CommonModule,
    DialogModule,
    ButtonModule
  ]
})
export class ApproveModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApproveDirective } from './directives/approve.directive';
import { ApproveComponent } from './components/approve.component';
import { ButtonModule } from '../button/button.module';
import { DialogModule } from '../dialog/dialog.module';

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

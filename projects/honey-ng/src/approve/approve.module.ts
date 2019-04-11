import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApproveDirective } from './approve.directive';
import { ApproveComponent } from './approve.component';
import { HnModule, DialogModule } from 'projects/honey-ng/src/public_api';

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
    HnModule
  ]
})
export class ApproveModule { }

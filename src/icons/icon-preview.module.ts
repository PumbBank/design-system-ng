import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BadgeModule } from '../badge/badge.module';
import { IconsModule } from './icons.module';


@NgModule({
  exports: [IconsModule, BadgeModule],
  imports: [
    CommonModule,
    IconsModule,
    BadgeModule
  ],
})
export class IconPreviewModule {}


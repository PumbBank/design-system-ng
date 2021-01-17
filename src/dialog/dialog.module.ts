import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IconsModule } from '../icons';
import { BadgeModule } from '../badge';
import { SimplebarAngularModule } from 'simplebar-angular';
import {DialogComponent} from './components/dialog/dialog.component';
import {
  MillDialogActionsDirective, MillDialogCloseDirective, MillDialogContentDirective,
  MillDialogTitleDirective,
  MillTemplateRefDirective
} from './directives/dialog.directive';
import { PortalOverlayComponent } from './components/portal-overlay/portal-overlay.component';
import {MillDialog} from './dialog.service';
import { ButtonModule } from '../button';

@NgModule({
  imports: [
    CommonModule,
    IconsModule,
    BadgeModule,
    SimplebarAngularModule,
    ButtonModule,
  ],
  declarations: [
    DialogComponent,
    MillDialogCloseDirective,
    MillDialogActionsDirective,
    MillDialogTitleDirective,
    MillTemplateRefDirective,
    MillDialogContentDirective,
    PortalOverlayComponent,
  ],
  exports: [
    DialogComponent,
  ],
  providers: [
    MillDialog,
  ],
  entryComponents: [
    DialogComponent,
    PortalOverlayComponent,
  ],
})

export class DialogModule { }

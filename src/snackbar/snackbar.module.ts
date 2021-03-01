import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SnackBarComponent } from './components/snackbar/snackbar.component';
import { DomService } from '../utils/services/dom.service';
import { IconsModule } from '../icons';
import { ButtonModule } from '../button';
import { SnackBarOverlayComponent } from './components/snackbar-overlay/snackbar-overlay.component';
import { SnackBarService } from './services/snackbar.service';

@NgModule({
  declarations: [SnackBarComponent, SnackBarOverlayComponent],
  entryComponents: [SnackBarOverlayComponent],
  exports: [SnackBarOverlayComponent],
  imports: [
    CommonModule,
    IconsModule,
    ButtonModule,
  ],
  providers: [
    DomService,
    SnackBarService
  ]
})
export class SnackbarModule { }

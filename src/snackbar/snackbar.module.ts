import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SnackBarComponent } from './components/snackbar/snackbar.component';
import { DomService } from '../utils/services/dom.service';
import { IconsModule } from '../icons';
import { ButtonModule } from '../button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SnackBarOverlayComponent } from './components/snackbar-overlay/snackbar-overlay.component';
import { SnackbarWrapperComponent } from './components/snackbar-wrapper/snackbar-wrapper.component';
import { SnackBarService } from './services/snackbar.service';



@NgModule({
  declarations: [SnackBarComponent, SnackBarOverlayComponent, SnackbarWrapperComponent],
  entryComponents: [SnackbarWrapperComponent, SnackBarOverlayComponent],
  exports: [SnackBarOverlayComponent],
  imports: [
    CommonModule,
    IconsModule,
    ButtonModule,
    BrowserAnimationsModule
  ],
  providers: [
    DomService,
    SnackBarService
  ]
})
export class SnackbarModule { }

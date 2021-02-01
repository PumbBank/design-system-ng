import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SnackBarComponent } from './components/snackbar/snackbar.component';
import { DomService } from '../utils/services/dom.service';
import { IconsModule } from '../icons/icons.module';
import { ButtonModule } from '../button/button.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SnackBarOverlayComponent } from './components/snackbar-overlay/snackbar-overlay.component';
import { SnackbarWrapperComponent } from './components/snackbar-wrapper/snackbar-wrapper.component';



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
  providers: [DomService]
})
export class SnackbarModule { }

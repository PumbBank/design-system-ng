import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DialogHeaderComponent } from './components/dialog-header/dialog-header.component';
import { DialogBodyComponent } from './components/dialog-body/dialog-body.component';
import { DialogFooterComponent } from './components/dialog-footer/dialog-footer.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { PortalForDialogComponent } from './components/portal-for-dialog/portal-for-dialog.component';
import { DialogService } from './services/dialog-service';
import { OverlayComponent } from './components/overlay/overlay.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    DialogComponent,
    DialogHeaderComponent,
    DialogBodyComponent,
    DialogFooterComponent,
    PortalForDialogComponent,
    OverlayComponent
  ],
  entryComponents: [
    OverlayComponent
  ],
  exports: [
    DialogComponent,
    DialogHeaderComponent,
    DialogBodyComponent,
    DialogFooterComponent,
    PortalForDialogComponent
  ],
  providers: []
})
export class DialogModule {
  static forRoot() {
    return {
      ngModule: DialogModule,
      providers: [DialogService],
    }
  }
}


import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DialogComponent } from './components/dialog/dialog.component';
import { DialogHeaderComponent } from './components/dialog-header/dialog-header.component';
import { DialogBodyComponent } from './components/dialog-body/dialog-body.component';
import { DialogPortal } from './components/dialog-portal/dialog-portal.component';
import { OverlayComponent } from './components/overlay/overlay.component';
import { DialogFooterComponent } from './components/dialog-footer/dialog-footer.component';
import { DialogService } from './services/dialog-service';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    DialogComponent,
    DialogHeaderComponent,
    DialogBodyComponent,
    DialogFooterComponent,
    DialogPortal,
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
    DialogPortal
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

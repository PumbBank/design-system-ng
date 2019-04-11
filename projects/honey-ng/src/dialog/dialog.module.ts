import { DialogPortalComponent } from './components/dialog-portal/dialog-portal.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DialogHeaderComponent } from './components/dialog-header/dialog-header.component';
import { DialogBodyComponent } from './components/dialog-body/dialog-body.component';
import { DialogFooterComponent } from './components/dialog-footer/dialog-footer.component';
import { DialogComponent } from './components/dialog/dialog.component';
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
    DialogPortalComponent,
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
    DialogPortalComponent
  ],
  providers: []
})
export class DialogModule {
  static forRoot() {
    return {
      ngModule: DialogModule,
      providers: [DialogService],
      entryComponents: [
        OverlayComponent
      ]
    };
  }
}

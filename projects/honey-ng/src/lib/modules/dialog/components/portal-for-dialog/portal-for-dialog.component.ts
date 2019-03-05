import { Component, forwardRef, InjectionToken, ViewContainerRef } from '@angular/core';
import { DialogService } from '../../services/dialog-service';


@Component({
  selector: 'hn-portal-for-dialog',
  template: ''
})
export class PortalForDialogComponent {
  constructor(
    dialogService: DialogService,
    viewContainerRef: ViewContainerRef
  ) {
    dialogService.registrateViewContainer(viewContainerRef);
  }
}


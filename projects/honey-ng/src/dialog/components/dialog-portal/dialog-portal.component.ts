import { Component, ViewContainerRef } from '@angular/core';
import { DialogService } from '../../services/dialog-service';


@Component({
  selector: 'hn-dialog-portal',
  template: ''
})
export class DialogPortalComponent {
  constructor(
    dialogService: DialogService,
    viewContainerRef: ViewContainerRef
  ) {
    dialogService.registrateDefaultViewContainer(viewContainerRef);
  }
}


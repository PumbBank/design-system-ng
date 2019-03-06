import { Component, ViewContainerRef } from '@angular/core';
import { DialogService } from '../../services/dialog-service';


@Component({
  selector: 'hn-dialog-portal',
  template: ''
})
export class DialogPortal {
  constructor(
    dialogService: DialogService,
    viewContainerRef: ViewContainerRef
  ) {
    dialogService.registrateDefaultViewContainer(viewContainerRef);
  }
}


import { Component, ViewChild, ViewContainerRef } from "@angular/core";

@Component({
  selector: 'snackbar-overlay',
  template: '<template #ref></template>'
})
export class SnackBarOverlayComponent {
  @ViewChild('ref', { read: ViewContainerRef }) container: ViewContainerRef;

  constructor(public viewContainerRef: ViewContainerRef) { }

}

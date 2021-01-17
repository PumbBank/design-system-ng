import {Component, OnInit, ViewChild, ViewContainerRef} from '@angular/core';

@Component({
  selector: 'portal-overlay',
  template: '<template #ref></template>',
  styleUrls: ['./portal-overlay.component.scss'] // TODO scss
})
export class PortalOverlayComponent implements OnInit {

  @ViewChild('ref', { read: ViewContainerRef }) container: ViewContainerRef;

  constructor(public viewContainerRef: ViewContainerRef) { }

  ngOnInit(): void {
  }

}

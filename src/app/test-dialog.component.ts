import { Component } from "@angular/core";
import { DialogService } from 'projects/honey-ng/src/lib/modules/dialog/services/dialog-service';

@Component({
  selector: 'test-dialog',
  template: `
    <hn-dialog>
      <hn-dialog-body>
        <hn-button (click)="test()">Newxt</hn-button>
      </hn-dialog-body>
    </hn-dialog>
  `
})
export class TestDialogComponet {
  constructor(
    public d: DialogService
  ) { }

  test(): any {
    this.d.openDialog(TestDialogComponet);
  }
}

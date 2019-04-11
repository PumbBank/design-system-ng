import { Component, Inject } from '@angular/core';
import { DIALOG_DATA } from '../dialog/shared/dialog';


@Component({
  selector: 'hn-approve',
  templateUrl: 'approve.component.html'
})
export class ApproveComponent {

  public dialogBody: string = 'Please setup Dialog Body: hnApprove="Your question"';

  constructor(
    @Inject(DIALOG_DATA) private data: any
  ) {
    this.dialogBody = data.question;
  }

  submit() {
    this.data.approveCallback();
  }

  close() {
    this.data.rejectCallback();
  }
}

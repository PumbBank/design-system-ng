import { Directive, HostListener, EventEmitter, Output, Input } from '@angular/core';
import { DialogService } from '../dialog/public_api';
import { ApproveComponent } from './approve.component';

@Directive({
  selector: '[hnApprove]'
})
export class ApproveDirective {

  @Input('hnApprove')
  approveQuestion: string;

  @Output()
  approved: EventEmitter<any> = new EventEmitter();

  @Output()
  rejected: EventEmitter<any> = new EventEmitter();

  constructor(private dialogService: DialogService) { }

  @HostListener('click')
  openDialog() {
    const controller = this.dialogService.
      openDialog(ApproveComponent, {
        data: {
          approveCallback: () => {
            this.approved.emit();
            controller.close();
          },
          rejectCallback: () => {
            this.rejected.emit();
            controller.close();
          },
          question: this.approveQuestion
        }
      });
  }
}

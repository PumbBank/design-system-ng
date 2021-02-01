import { Component, Inject, Output, EventEmitter } from '@angular/core';
import { DialogConroller } from '../../models/dialog-params';
import { DIALOG_CONTROLLER, DIALOG_DATA } from '../../shared/dialog';

@Component({
  selector: 'app-dialog-content',
  templateUrl: './dialog-content.component.html',
  styleUrls: ['./dialog-content.component.scss']
})
export class DialogContentComponent {

  @Output() proceed = new EventEmitter<void>();

  constructor(@Inject(DIALOG_DATA) public dialogData: any,
  @Inject(DIALOG_CONTROLLER) private dialogController: DialogConroller) { }

  onOk() {
    this.proceed.emit();
    this.dialogController.close();
  }

}

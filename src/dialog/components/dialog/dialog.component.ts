import { Component, HostBinding, Inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MILL_DIALOG_DATA, MillDialog, MillDialogConfig } from '../../dialog.service';

@Component({
  selector: 'mill-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  @HostBinding('style.minWidth.px') minWidth: number;
  @HostBinding('style.minHeight.px') minHeight: number;

  @ViewChild(MillDialog) millDialog: MillDialog;
  @ViewChild('template') _template: TemplateRef<any>;
  @ViewChild('millRef') millRef: TemplateRef<any>;

  constructor(
    @Inject(MILL_DIALOG_DATA) public data: any,
    @Inject(MillDialogConfig) public config: any,
    private dialogService: MillDialog,
              ) {
  }

  ngOnInit(): void {
    this.minWidth = this.config.minWidth;
    this.minHeight = this.config.minHeight;
  }

  applyAction(): void {
    this.config.buttons.apply.action(this);
    this.dialogService.close();
  }

  cancelAction(): void {
    this.config.buttons.cancel.action(this);
    this.dialogService.close();
  }
}


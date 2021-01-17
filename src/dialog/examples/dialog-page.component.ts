import { Component, ComponentRef, Input, OnInit } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
import { MillDialog } from '../dialog.service';
import { DialogComponent } from '..';

@Component({
  selector: 'mill-dialog-overview',
  templateUrl: './dialog-page.component.html',
  styleUrls: ['./dialog-page.component.scss', '../../assets/styles/overview.scss']
})
export class DialogOverviewComponent implements OnInit {
  @Input() label: string;

  invalid: FormControl = new FormControl('', Validators.required);
  valid: FormControl = new FormControl('');

  constructor(private millDialog: MillDialog) {
  }

  ngOnInit(): void {
    this.invalid.markAsTouched();
    this.valid.markAsTouched();
  }

  openModalTitle(): void {
    this.millDialog.open<DialogComponent>(DialogComponent, {
      data: {
        title: 'Підтвердіть дію',
        text: 'Вийти з системи?'
      },
      buttons: {
        apply: {
          text: 'Вийти',
          action: this.testMethod.bind(this),
        },
        cancel: {
          text: 'Залишитись',
          action: this.testMethod.bind(this),
        },
      },
      hasBackdrop: true,
      minWidth: 376,
      minHeight: 136,
    });
  }

  testMethod(): void {
    // tslint:disable-next-line:no-console
    console.log('apply cancel');
  }
}

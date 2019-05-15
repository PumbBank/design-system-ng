import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { DialogService, IDataSource, IOption } from 'projects/honey-ng/src/public_api';
import { AppService } from './app.service';
import { of, Observable } from 'rxjs';
import { DataSource } from './models/data-source';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  control = new FormControl(undefined, Validators.pattern('^[0-9]{1,}$')); // [^\d+(?:\.{1}\d{1,4})$]/igm,
  control1 = new FormControl(35, Validators.pattern('^[0-9]{1,}$')); // [^\d+(?:\.{1}\d{1,4})$]/igm,
  control2 = new FormControl('hi', Validators.required);

  title = 'hn-angular-test';
  errors: string = '';

  fc = new FormControl();

  fg = new FormGroup({
    name: new FormControl(''),
    brand: new FormControl('SAMSUNG')
  });

  form = new FormGroup({
    grace_term: new FormControl('', Validators.required),
    technical_merchant_id: new FormControl('', Validators.required)
  });

  techMerchIds = ['val_1', 'val_2', 'val_21', 'val_22', 'val_23', 'val_3', 'val_4', 'val_5', 'val_6'];

  dataSrc = new DataSource(this.techMerchIds) as IDataSource<string>;

  source: any;
  constructor(
    private dialog: DialogService
  ) { }

  ngOnInit(): void {
    let i = 1;
    this.source = {
      get(params: any) {
        return ++i;
      },

      // transform(a: any): IOption {

      // }
    };
  }

  openDialog() {
  }

  a(value: any): string {
    return typeof value;
  }

  onSort(e: any) {
    console.log(e);
  }

  ok(value: string) {
    console.log(value, 'APPROVED');
  }

  no(value: string) {
    console.log(value, 'REJECTED');
  }

  submit() {
    if (!this.form.valid) {
      this.markControlsAsTouched(this.form);
      return;
    }
  }

  filterChanged(value: string) {
    console.log(value);
  }

  private markControlsAsTouched(formGroup: FormGroup | FormArray) {

    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup || control instanceof FormArray) {
        this.markControlsAsTouched(control);
      }
    });
  }
}

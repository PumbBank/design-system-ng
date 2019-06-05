import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { DialogService, IDataSource } from 'projects/honey-ng/src/public_api';
import { of, Observable } from 'rxjs';
import { DataSource } from './models/data-source';
import { debounceTime, map, distinctUntilChanged } from 'rxjs/operators';

export interface Obj {
  id: string;
  name: string;
  info: string;
}

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
    // grace_term: new FormControl('', Validators.required),
    fc_created_at: new FormControl('', Validators.required),
    technical_merchant_id: new FormControl('', Validators.required),
    objects: new FormControl('', Validators.required),
  });


  techMerchIds = ['val_1', 'val_2', 'val_21', 'val_22', 'val_23', 'val_3', 'val_4', 'val_5', 'val_6'];

  objectsArray: Observable<Obj[]>;
  // = of([
  //   { id: 'id_11', name: 'nm_11', info: 'inf_11' },
  //   { id: 'id_12', name: 'nm_12', info: 'inf_12' },
  //   { id: 'id_13', name: 'nm_13', info: 'inf_13' },
  //   { id: 'id_14', name: 'nm_14', info: 'inf_14' },
  //   { id: 'id_15', name: 'nm_15', info: 'inf_15' },
  //   { id: 'id_16', name: 'nm_16', info: 'inf_16' },
  //   { id: 'id_17', name: 'nm_17', info: 'inf_17' },
  //   { id: 'id_18', name: 'nm_18', info: 'inf_18' },
  //   { id: 'id_19', name: 'nm_19', info: 'inf_19' },
  //   { id: 'id_20', name: 'nm 2-0', info: 'inf_20' },
  //   { id: 'id_21', name: 'nm_21', info: 'inf_21' },
  //   { id: 'id_22', name: 'nm_22', info: 'inf_22' },
  // ]);

  dataSrc = new DataSource(this.techMerchIds) as IDataSource<string>;


  source: any;
  constructor(
    private dialog: DialogService
  ) { }

  ngOnInit(): void {

    setTimeout(() => {
      this.objectsArray = of([
        { id: 'id_11', name: 'nm_11', info: 'inf_11' },
        { id: 'id_12', name: 'nm_12', info: 'inf_12' },
        { id: 'id_13', name: 'nm_13', info: 'inf_13' },
        { id: 'id_14', name: 'nm_14', info: 'inf_14' },
        { id: 'id_15', name: 'nm_15', info: 'inf_15' },
        { id: 'id_16', name: 'nm_16', info: 'inf_16' },
        { id: 'id_17', name: 'nm_17', info: 'inf_17' },
        { id: 'id_18', name: 'nm_18', info: 'inf_18' },
        { id: 'id_19', name: 'nm_19', info: 'inf_19' },
        { id: 'id_20', name: 'nm 2-0', info: 'inf_20' },
        { id: 'id_21', name: 'nm_21', info: 'inf_21' },
        { id: 'id_22', name: 'nm_22', info: 'inf_22' },
      ]);
    }, 100);

    this.form.setValue({ technical_merchant_id: 'val_22', objects: 'val_23', fc_created_at: '' });

    this.form.valueChanges.subscribe(fg => console.log('fg => ', fg));

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
    this.form.controls.fc_created_at.setValue('');

    if (!this.form.valid) {
      this.markControlsAsTouched(this.form);
      return;
    }
    console.log('this.form.controls => ', this.form.controls);
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

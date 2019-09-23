import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators, FormArray, ValidationErrors } from '@angular/forms';
import { DialogService, IDataSource } from 'projects/honey-ng/src/public_api';
import { of, Observable } from 'rxjs';
import { DataSource } from './models/data-source';
import { debounceTime, map, distinctUntilChanged } from 'rxjs/operators';
import { createTextMaskInputElement } from 'text-mask-core';

export function maxLengthValidator(maxLength: number = 0): (control) => ValidationErrors | null {
  return (control: FormControl): ValidationErrors | null => {
    if (control.value.length > maxLength) {
      return { errorMessage: `Максимальна кількість символів: ${maxLength}` };
    } else {
      return null;
    }
  };
}
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

  @ViewChild('inputt') inp: ElementRef;

  control = new FormControl(null, [Validators.required, Validators.pattern('^[0-9]{1,}$')]);

  ds = {
    search: () => Promise.resolve([]),
    get: () => Promise.resolve({key: 1, value: 1})
  };

  constructor(
    private dialog: DialogService
  ) { }

  ngOnInit() {


  }

  c = (v) => v.replace(/[^\d]/g, '');

}

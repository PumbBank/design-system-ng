import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TestDialogComponent } from './test-dialog.component';
import { DialogService } from 'projects/honey-ng/src/public_api';

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

  fg = new FormGroup({
    name: new FormControl(''),
    brand: new FormControl('SAMSUNG')
  });

  constructor(
    private dialog: DialogService
  ) { }

  ngOnInit(): void {
  }

  openDialog() {
  }

  a(value: any): string {
    return typeof value;
  }

  test() {
    const pp = this.control2;
  }
}

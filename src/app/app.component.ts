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

  control = new FormControl('hi', Validators.pattern('^[0-9]{3,}$'));
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
    // this.fg.controls.brand.value;
    this.fg.controls.name.setValidators([(c: FormControl) => {
      return c.value.length > 3 ? { error: '' } : null;
    }, Validators.required]);
  }

  openDialog() {
    this.dialog.openDialog(TestDialogComponent);
  }

  getErrorMessage(control: FormControl): string {
    const message = 'any msg';
    if (control.touched && control.dirty && control.invalid) {

      if (control.errors.required) {
        return 'control.errors.required';
      }

      if (control.errors.pattern) {
        return 'control.errors.pattern';
      }
    }
    return message;
  }
}

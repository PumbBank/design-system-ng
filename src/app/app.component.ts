import { routes } from './app-routing.module';
import { Component, OnInit } from '@angular/core';
import { FormControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  routes = routes;

  silentValidatorError: ValidationErrors = null;

  control1 = new FormControl('');

  constructor(
  ) { }

  ngOnInit() {
  }

  checkValue(value: any) {
    if (value.length > 4) {
      this.silentValidatorError = { errorMessage: 'Some value' };
      return;
    }
    this.silentValidatorError = null;
  }
}

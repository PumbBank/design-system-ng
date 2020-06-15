import { Component, OnInit } from '@angular/core';
import { FormControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'input-overview',
  templateUrl: './input-overview.component.html',
  styleUrls: ['./input-overview.component.scss', '../../../assets/styles/overview.scss']
})
export class InputOverviewComponent implements OnInit {
  nameControl: FormControl = new FormControl('',
    (v) => v.value.length < 3 ? { errorMessage: 'Minimun 3 symbols' } : null);
  nameControlWithIcon: FormControl = new FormControl('',
    (v) => v.value.length < 3 ? { errorMessage: 'Minimun 3 symbols' } : null);
  dateControl: FormControl = new FormControl('',
    (v) => new Date(v.value).getFullYear() < 2000 ? { errorMessage: 'Year less then 2000' } : null);
  digitControl: FormControl = new FormControl('',
    (v) => v.value < 1000 ? { errorMessage: 'Count more then 1000' } : null);
  moneyControl: FormControl = new FormControl('',
    (v) => v.value > 99.99 ? { errorMessage: 'Max price 99.99' } : null);
  validControl: FormControl = new FormControl('');
  errorControl: FormControl = new FormControl('',
    (v) => !v.value ? { errorMessage: 'Message Text' } : null);
  infoControl: FormControl = new FormControl('');
  disabledControl: FormControl = new FormControl('');

  validControlErrors: ValidationErrors | null;

  ngOnInit(): void {
    this.errorControl.markAsTouched();
    this.errorControl.updateValueAndValidity();
    this.disabledControl.disable();

    this.validControlErrors = this.validateTaxId();
    this.infoControl.markAsTouched();
  }

  validateTaxId(): ValidationErrors | null {
    return { errorMessage: 'Info alert' };
  }
}

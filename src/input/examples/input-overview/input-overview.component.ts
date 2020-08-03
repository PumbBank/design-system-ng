import { Component, OnInit } from '@angular/core';
import { FormControl, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'input-overview',
  templateUrl: './input-overview.component.html',
  styleUrls: ['./input-overview.component.scss', '../../../assets/styles/overview.scss']
})
export class InputOverviewComponent implements OnInit {
  nameControl: FormControl = new FormControl('');
  nameControlWithIcon: FormControl = new FormControl('');
  dateControl: FormControl = new FormControl('', (v) =>
    new Date(v.value).getFullYear() < 2000 ? { errorMessage: 'Рік менше 2000' } : null);
  cardControl: FormControl = new FormControl('');
  digitControl: FormControl = new FormControl('', (v) =>
    v.value < 1000 ? { errorMessage: 'Кількість більше 1000' } : null);
  validControl: FormControl = new FormControl('');
  errorControl: FormControl = new FormControl('', (v) =>
    !v.value ? { errorMessage: 'Текст повідомлення' } : null);
  infoControl: FormControl = new FormControl('');
  phoneControl: FormControl = new FormControl('');
  disabledControl: FormControl = new FormControl({ value: '', disabled: true });

  validControlErrors: ValidationErrors | null;

  arrCoordinates = [];

  ngOnInit(): void {
    this.errorControl.markAsTouched();
    this.errorControl.updateValueAndValidity();

    this.validControlErrors = this.validateTaxId();
    this.infoControl.markAsTouched();

  }




  validateTaxId(): ValidationErrors | null {
    return { errorMessage: 'Info alert' };
  }
}

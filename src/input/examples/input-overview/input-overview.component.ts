import { Component, OnInit } from '@angular/core';
import { FormControl, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'input-overview',
  templateUrl: './input-overview.component.html',
  styleUrls: ['./input-overview.component.scss', '../../../assets/styles/overview.scss']
})
export class InputOverview implements OnInit {
  nameControl = new FormControl('', (v) => v.value.length < 3 ? { errorMessage: 'Мінімум 3 символи' } : null);
  nameControlWithIcon = new FormControl('', (v) => v.value.length < 3 ? { errorMessage: 'Мінімум 3 символи' } : null);
  dateControl = new FormControl('', (v) => new Date(v.value).getFullYear() < 2000 ? { errorMessage: 'Рік менше 2000' } : null);
  cardControl = new FormControl('', Validators.required);
  digitControl = new FormControl('', (v) => v.value < 1000 ? { errorMessage: 'Кількість більше 1000' } : null);
  moneyControl = new FormControl('', (v) => v.value > 99.99 ? { errorMessage: 'Максимальна ціна 99,99' } : null);
  validControl = new FormControl('');
  errorControl = new FormControl('', (v) => !v.value ? { errorMessage: 'Текст повідомлення' } : null);
  infoControl = new FormControl('');
  phoneControl = new FormControl('');
  disabledControl = new FormControl('');

  validControlErrors: ValidationErrors | null;

  ngOnInit(): void {
    this.errorControl.markAsTouched()
    this.errorControl.updateValueAndValidity();
    this.disabledControl.disable();

    this.validControlErrors = this.validateTaxId();
    this.infoControl.markAsTouched();
  }

  validateTaxId(): ValidationErrors | null {
    return { errorMessage: 'Info alert' };
  }
}

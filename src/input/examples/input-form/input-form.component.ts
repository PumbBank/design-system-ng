import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { FormControl, ValidationErrors, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.scss', '../../../assets/styles/overview.scss']
})

export class InputFormComponent implements OnInit, AfterViewInit {
  noticeItems: string[] = [
    'Якщо обов\'язкове поле в фокусі, а потім фокус знімається без введення даних – повідомлення про обов\'язкове поле не виводиться.',
    'Якщо обов\'язкове поле в фокусі, потім було зроблено введення даних, потім ці дані були стерті і фокус знятий – виводиться повідомлення про обов\'язкове поле.',
    'Затвердження обов\'язкових полів відбувається при натисканні кнопки Submit.',
    'При помилках в полях введення (в т.ч. про обов\'язкове поле) – екран проскролюється до самої верхньої помилки.',
    'При відкритті форми – найперше верхнє поле введення, за замовчуванням виявляється у фокусі.'
  ];

  formGr: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    walletNumber: new FormControl('', Validators.required),
    phoneNumber: new FormControl('', (v) => {
      return v.value.length !== 12 ? { errorMessage: '+380 (00) 000-00-00' } : null;
    }),
    downPayment: new FormControl('', Validators.required),
    cardNumber: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    printerBrand: new FormControl('', Validators.required),
    homeNumber: new FormControl(''),
    alias: new FormControl(''),
    scientificDegree: new FormControl('')
  });

  validControlErrors: ValidationErrors | null;

  @ViewChild('firstInput') firstInput: ElementRef;

  ngOnInit(): void {
    this.validControlErrors = this.optionalInputMes();
  }

  ngAfterViewInit(): void {
    this.firstInput.nativeElement.focus();
  }

  onFormSubmit(): void {
    if (!this.formGr.valid) {
      this.scrollToError();
    }
  }

  optionalInputMes(): ValidationErrors | null {
    return { errorMessage: 'Не обов\'язково' };
  }

  private scrollToError(): void {
    const firstElementWithError = document.querySelector('.ng-invalid[formControlName]');
    this.scrollTo(firstElementWithError);
  }

  private scrollTo(el: Element): void {
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }
}

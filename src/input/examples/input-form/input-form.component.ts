import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { FormControl, ValidationErrors, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.scss', '../../../assets/styles/overview.scss']
})

export class InputFormComponent implements OnInit, AfterViewInit {


  formGr: FormGroup = new FormGroup({
    name: new FormControl(''),
    walletNumber: new FormControl('', Validators.required),
    phoneNumber: new FormControl('', Validators.required),
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

import { Component, OnInit } from '@angular/core';
import { FormControl, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'input-overview',
  templateUrl: './input-overview.component.html',
  styleUrls: ['./input-overview.component.scss', '../../../assets/styles/overview.scss']
})
export class InputOverviewComponent implements OnInit {
  nameControl: FormControl = new FormControl('', Validators.required);
  nameControlWithIcon: FormControl = new FormControl('');
  dateControl: FormControl = new FormControl('');
  cardControl: FormControl = new FormControl('');
  digitControl: FormControl = new FormControl('');
  validControl: FormControl = new FormControl('');
  errorControl: FormControl = new FormControl('', (v) =>
    !v.value ? { errorMessage: 'Текст повідомлення' } : null);
  infoControl: FormControl = new FormControl('');
  phoneControl: FormControl = new FormControl('');
  disabledControl: FormControl = new FormControl({ value: '', disabled: true });

  validControlErrors: ValidationErrors | null;

  arrCoordinates: any[] = [];

  ngOnInit(): void {
    this.errorControl.markAsTouched();

    this.validControlErrors = this.validateTaxId();
    this.infoControl.markAsTouched();

  }




  validateTaxId(): ValidationErrors | null {
    return { errorMessage: 'Info alert' };
  }
}

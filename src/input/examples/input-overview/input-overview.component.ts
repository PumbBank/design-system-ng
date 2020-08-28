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
  phoneControl: FormControl = new FormControl('',[Validators.required,(v) => {
    return v.value.length !== 12 ? { errorMessage: '+380 (00) 000-00-00' } : null;
  }]);
  disabledControl: FormControl = new FormControl({ value: '', disabled: true });
  validControlErrors: ValidationErrors | null;
  noticeItems: string[] = [
    'Якщо обов\'язкове поле в фокусі, а потім фокус знімається без введення даних – повідомлення про обов\'язкове поле не виводиться.',
    'Якщо обов\'язкове поле в фокусі, потім було зроблено введення даних, потім ці дані були стерті і фокус знятий – виводиться повідомлення про обов\'язкове поле.',
    'Затвердження обов\'язкових полів відбувається при натисканні кнопки Submit.',
    'При помилках в полях введення (в т.ч. про обов\'язкове поле) – екран проскролюється до самої верхньої помилки.',
    'При відкритті форми – найперше верхнє поле введення, за замовчуванням виявляється у фокусі.'
  ];

  ngOnInit(): void {
    this.errorControl.markAsDirty();

    this.validControlErrors = this.validateTaxId();
  }

  validateTaxId(): ValidationErrors | null {
    return { errorMessage: 'Info alert' };
  }
}

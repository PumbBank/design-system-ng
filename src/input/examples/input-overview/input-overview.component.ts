import { Component, OnInit, Input } from '@angular/core';
import { FormControl, ValidationErrors, Validators } from '@angular/forms';
import { validIBAN } from 'src/validators/validators';

export enum InputViews {
  labelPlaceholder = 'basic',
  placeholder = 'placeholder',
  label = 'label ',
  simple = 'simple ',
}

@Component({
  selector: 'input-overview',
  templateUrl: './input-overview.component.html',
  styleUrls: ['./input-overview.component.scss', '../../../assets/styles/overview.scss']
})

export class InputOverviewComponent implements OnInit {
  nameControl: FormControl = new FormControl('');
  nameControlWithIcon: FormControl = new FormControl('');
  dateControl: FormControl = new FormControl('');
  cardControl: FormControl = new FormControl('');
  ibanControl: FormControl = new FormControl('', validIBAN);
  digitControl: FormControl = new FormControl('');
  validControl: FormControl = new FormControl('');
  errorControl: FormControl = new FormControl('', (v) =>
    !v.value ? { errorMessage: 'Текст повідомлення' } : null);
  infoControl: FormControl = new FormControl('');
  phoneControl: FormControl = new FormControl('');
  disabledControl: FormControl = new FormControl({ value: '', disabled: true });

  textAreaBasicControl: FormControl = new FormControl('');
  textAreaValidControl: FormControl = new FormControl('');
  textAreaErrorControl: FormControl = new FormControl('', Validators.required);
  textAreaInfoControl: FormControl = new FormControl('');

  validControlErrors: ValidationErrors | null;
  noticeItems: string[] = [
    'Якщо обов\'язкове поле в фокусі, а потім фокус знімається без введення даних – повідомлення про обов\'язкове ' +
    'поле не виводиться.',
    'Якщо обов\'язкове поле в фокусі, потім було зроблено введення даних, потім ці дані були стерті і фокус знятий ' +
    '– виводиться повідомлення про обов\'язкове поле.',
    'Затвердження обов\'язкових полів відбувається при натисканні кнопки Submit.',
    'При помилках в полях введення (в т.ч. про обов\'язкове поле) – екран проскролюється до самої верхньої помилки.',
    'При відкритті форми – найперше верхнє поле введення, за замовчуванням виявляється у фокусі.'
  ];

  hideLabel: boolean;
  hidePlaceholder: boolean;

  @Input() label: string;
  @Input() placeholder: string;
  @Input() set views(val: InputViews) {
    switch (val) {
      case InputViews.label:
        this.hideLabel = false;
        this.hidePlaceholder = true;
        break;
      case InputViews.labelPlaceholder:
        this.hideLabel = false;
        this.hidePlaceholder = false;
        break;
      case InputViews.placeholder:
        this.hideLabel = true;
        this.hidePlaceholder = false;
        break;
      case InputViews.simple:
        this.hideLabel = true;
        this.hidePlaceholder = true;
        break;
      default:
        this.hideLabel = false;
        this.hidePlaceholder = false;
        break;
    }
  }

  @Input() resizeTextarea: 'none' | 'both' | 'horizontal' | 'vertical' | 'inherit';

  ngOnInit(): void {
    this.errorControl.markAsDirty();

    this.textAreaValidControl.markAsDirty();
    this.textAreaErrorControl.markAsDirty();

    this.validControlErrors = this.validateTaxId();
  }

  validateTaxId(): ValidationErrors | null {
    return { errorMessage: 'Info alert' };
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'mill-radio-overview',
  templateUrl: './radio-page.component.html',
  styleUrls: ['./radio-page.component.scss', '../../assets/styles/overview.scss']
})

export class RadioOverviewComponent implements OnInit {
  @Input() label: string;
  @Input() hideLabel: boolean;

  oneGroup: string = 'oneGroup';

  radioControl: FormControl = new FormControl('');

  noticeItems: string[] = [
    'Негативне значення (зазвичай tabindex=”-1”) – елемент не може приймати участь в послідовній навігації за допомогою клавіатури але може бути сфокусованим завдяки JavaScript. В основному корисно створювати доступні віджети за допомогою JavaScript.',
    'Значення 0 – елемент може бути виділений і досягнут за допомогою послідовної навігації, але порядок навігації буде визначений оточенням на сторінці. Наприклад, тег form с набором input елементів: які приймають фокус за допомогою послідовній навігації завдяки стандартній поведінці.',
    'Позитивне ціле значення – елемент буде досягнутий (і виділений) за допомогою послідовної навігації, а порядок навігації визначений цим самим значенням. У разі, якщо кілька елементів містять одне і те ж значення tabindex, їх порядок навігації визначений відносним розташуванням в документі (DOM).'
  ];

  ngOnInit(): void {
    // this.radioControl.valueChanges.subscribe((val) => console.log(val));
  }
}

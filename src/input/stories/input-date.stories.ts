import { text } from '@storybook/addon-knobs';

import { InputModule } from '../input.module';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';

export const inputDateStory = () => ({
  moduleMetadata: {
    imports: [
      ReactiveFormsModule,
      CommonModule,
      InputModule
    ]
  },
  props: {
    nameControl: new FormControl('', (v) => v.value.length < 3 ? { errorMessage: 'Minimun 3 symbols' } : null),
    dateControl: new FormControl('', (v) => new Date(v.value).getFullYear() < 2000 ? { errorMessage: 'Year less then 2000' } : null),
    digitControl: new FormControl('', (v) => v.value < 1000 ? { errorMessage: 'Count more then 1000' } : null),
    moneyControl: new FormControl('', (v) => v.value > 99.99 ? { errorMessage: 'Max price 99.99' } : null),
  },
  template: `
  <div class="h3">Inputs</div>
  <br>
    <div class="grid">
      <div class="grid-item-3">
        <input icon="user" millInput="text" [formControl]="nameControl" [valid]="nameControl.valid" [errors]="nameControl.errors" required caption="Enter Name" placeholder="Ivanov Ivan">
      </div>
      <div class="grid-item-3">
        <input millInput="date" [formControl]="dateControl" [valid]="dateControl.valid" [errors]="dateControl.errors" required caption="Enter Date" placeholder="dd.mm.yyyy">
      </div>
      <div class="grid-item-3">
        <input millInput="digit" [formControl]="digitControl" [valid]="digitControl.valid ? 'Valid' : null" [errors]="digitControl.errors" required caption="Enter digit" placeholder="Enter digit">
      </div>
      <div class="grid-item-3">
        <input millInput="money" [formControl]="moneyControl" [errors]="moneyControl.errors" required caption="Enter price" placeholder="Enter price">
      </div>
    </div>
	`
});

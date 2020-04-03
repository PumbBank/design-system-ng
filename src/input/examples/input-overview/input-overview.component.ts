import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input-overview-example',
  templateUrl: './input-overview.component.html',
  styleUrls: ['./input-overview.component.scss']
})
export class InputOverviewComponent {
  nameControl = new FormControl('', (v) => v.value.length < 3 ? { errorMessage: 'Minimun 3 symbols' } : null);
  dateControl = new FormControl('', (v) => new Date(v.value).getFullYear() < 2000 ? { errorMessage: 'Year less then 2000' } : null);
  digitControl = new FormControl('', (v) => v.value < 1000 ? { errorMessage: 'Count more then 1000' } : null);
  moneyControl = new FormControl('', (v) => v.value > 99.99 ? { errorMessage: 'Max price 99.99' } : null);
}
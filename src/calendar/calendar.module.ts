import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { CalendarComponent } from './components/calendar/calendar.component';
import { FormGroupDirective } from '@angular/forms';
import { IconsModule } from '../icons';
import { ButtonModule } from '../button';
import localeUk from '@angular/common/locales/uk';

const LOCALE_UK = 'uk';

@NgModule({
  declarations: [CalendarComponent],
  exports: [CalendarComponent],
  imports: [
    CommonModule,
    IconsModule,
    ButtonModule
  ],
  providers: [
    FormGroupDirective,
    {provide: LOCALE_ID, useValue: LOCALE_UK}
  ],
  entryComponents: [
    CalendarComponent
  ]
})

export class CalendarModule {
  constructor() {
    registerLocaleData(localeUk, LOCALE_UK);
  }
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './components/calendar/calendar.component';
import { FormGroupDirective } from '@angular/forms';
import { IconsModule } from '../icons';
import { ButtonModule } from '../button';

@NgModule({
  declarations: [CalendarComponent],
  exports: [CalendarComponent],
  imports: [
    CommonModule,
    IconsModule,
    ButtonModule
  ],
  providers: [FormGroupDirective],
  entryComponents: [
    CalendarComponent
  ]
})
export class CalendarModule { }

import { Directive, Optional, OnInit } from '@angular/core';
import { NgModel, AbstractControl, FormControlDirective } from '@angular/forms';
import { HintComponent } from './hint.component';
import { Subject, of } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ErrorMessageHelper } from '../utils/error-message.helper';
import { propertyChangeInterceptor } from '../utils/property-change-interceptor';

@Directive({
  selector: 'mill-hint[hintControl]'
})
export class HintControlDirective implements OnInit {
  private unsubscriber = new Subject();
  control: AbstractControl;

  constructor(
    private hint: HintComponent,
    @Optional() private ngModel: NgModel,
    @Optional() private formControlDirective: FormControlDirective
  ) {
    hint.show = false;
  }

  ngOnInit(): void {
    if (this.ngModel) {
      this.control = this.ngModel.control;
    } else if (this.formControlDirective) {
      this.control = this.formControlDirective.control;
    } else {
      console.warn(`[HintControlDirective] Can't find any abstractControl source (ngModel, formConrtol, formControlName)`);
    }

    this.control.statusChanges
      .subscribe(() => {
        this.matchStatuses();
      });

    propertyChangeInterceptor(this.control, 'touched', () => { this.matchStatuses(); });
  }

  private matchStatuses(): void {
    if (this.control.valid || !this.control.touched) {
      this.hint.show = false;
    } else {
      this.hint.icon = 'error';
      this.hint.color = 'error';
      this.hint.show = true;
      this.hint.caption = ErrorMessageHelper.getMessage(this.control.errors);
    }
  }
}


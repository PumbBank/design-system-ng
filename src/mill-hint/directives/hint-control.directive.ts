import { Directive, OnInit, Optional } from '@angular/core';
import { AbstractControl, NgModel, FormControlDirective } from '@angular/forms';
import { HintComponent } from '../components/hint/hint.component';
import { propertyChangeInterceptor } from 'src/utils/property-change-interceptor';
import { Subject } from 'rxjs';
import { ErrorMessageHelper } from 'src/utils/error-message.helper';

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
      throw new Error(`[HintControlDirective] Can't find any abstractControl source (ngModel, formConrtol, formControlName)`);
    }
    this.matchStatuses();
    this.control.statusChanges
      .subscribe(() => {
        this.matchStatuses();
      });

    propertyChangeInterceptor(this.control, 'touched', () => { this.matchStatuses(); });
  }

  private matchStatuses(): void {
    if (!this.control.valid && this.control.touched) {
      this.hint.icon = 'warning';
      this.hint.color = 'error';
      this.hint.show = true;
      this.hint.caption = ErrorMessageHelper.getMessage(this.control.errors);
    } else if (this.control.touched && this.hint.valid) {
      this.hint.icon = 'valid';
      this.hint.color = 'valid';
      this.hint.show = true;
    } else {
      this.hint.show = false;
    }
  }
}

import { Subject } from 'rxjs';
import { Directive, OnDestroy, OnInit, Optional } from '@angular/core';
import { AbstractControl, NgModel, FormControlDirective, FormControlName } from '@angular/forms';
import { HintComponent } from '..';
import { ErrorMessageHelper, propertyChangeInterceptorDirty } from '../../utils';
import { takeUntil } from 'rxjs/operators';


@Directive({
  selector: 'mill-hint[hintControl]'
})
export class HintControlDirective implements OnInit, OnDestroy {
  private _destroyed$: Subject<void> = new Subject<void>();
  control: AbstractControl;

  constructor(
    private hint: HintComponent,
    @Optional() private ngModel: NgModel,
    @Optional() private formControlDirective: FormControlDirective,
    @Optional() private formControlNameDirective: FormControlName
  ) {
    hint.show = false;
  }

  ngOnInit(): void {

    if (this.ngModel) {
      this.control = this.ngModel.control;
    } else if (this.formControlDirective) {
      this.control = this.formControlDirective.control;
    } else if (this.formControlNameDirective) {
      this.control = this.formControlNameDirective.control;
    } else {
      throw new Error(`[HintControlDirective] Can't find any abstractControl source (ngModel, formConrtol, formControlName)`);
    }
    this.matchStatuses();
    this.control.statusChanges
      .pipe(takeUntil(this._destroyed$))
      .subscribe(() => {
        this.matchStatuses();
      });

      propertyChangeInterceptorDirty(this.control, () => { this.matchStatuses(); });
    // propertyChangeInterceptor(this.control, 'touched', () => { this.matchStatuses(); });
  }

  public ngOnDestroy(): void {
    this._destroyed$.next();
    this._destroyed$.complete();
  }

  private matchStatuses(): void {

    if (!this.control.valid && this.control.dirty) {
      this.hint.icon = 'warning';
      this.hint.color = 'error';
      this.hint.show = true;
      this.hint.caption = ErrorMessageHelper.getMessage(this.control.errors);
    } else if (this.control.dirty && this.hint.valid) {
      this.hint.icon = 'valid';
      this.hint.color = 'valid';
      this.hint.show = true;
    } else {
      this.hint.show = false;
    }
  }
}

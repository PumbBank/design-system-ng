import { Subject } from 'rxjs';
import { Directive, OnInit, Optional } from '@angular/core';
import { AbstractControl, NgModel, FormControlDirective, FormControlName, FormGroupDirective } from '@angular/forms';
import { HintComponent } from '..';
import { propertyChangeInterceptor, ErrorMessageHelper } from '../../utils';
import { SelectComponent } from 'src/select';


@Directive({
  selector: 'mill-hint[hintControl]'
})
export class HintControlDirective implements OnInit {
  private unsubscribe: Subject<any> = new Subject();
  control: AbstractControl;

  get isDirtyValid() {
    return this.select.isDirtyValid;
  }

  constructor(
    private hint: HintComponent,
    private select: SelectComponent,
    public parentForm: FormGroupDirective,
    @Optional() private ngModel: NgModel,
    @Optional() private formControlDirective: FormControlDirective,
    @Optional() private formControlNameDirective: FormControlName
  ) {
    hint.show = false;
  }

  ngOnInit(): void {
    if (this.parentForm) {
      this.parentForm?.ngSubmit.subscribe(() => {
        this.matchStatuses();
      });
    }
    
    
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
      .subscribe(() => {
        this.matchStatuses();
      });

    propertyChangeInterceptor(this.control, 'touched', () => { this.matchStatuses(); });
  }

  private matchStatuses(): void {
    const methodValidation = !this.select.isDirtyValid ? this.control.touched : this.control.dirty;

    if ((!this.control.valid && methodValidation) || (!this.control.valid && this.parentForm.submitted)) {
      this.hint.icon = 'warning';
      this.hint.color = 'error';
      this.hint.show = true;
      this.hint.caption = ErrorMessageHelper.getMessage(this.control.errors);
    } else if (methodValidation && this.hint.valid) {
      this.hint.icon = 'valid';
      this.hint.color = 'valid';
      this.hint.show = true;
    } else {
      this.hint.show = false;
    }
  }
}

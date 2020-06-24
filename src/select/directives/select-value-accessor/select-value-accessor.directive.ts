import { SelectComponent } from '../../components/select/select.component';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Directive, forwardRef } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Directive({
  selector: 'mill-select[ngModel], mill-select[formControl], mill-select[formControlName]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectValueAccessorDirective),
      multi: true
    }
  ]
})
export class SelectValueAccessorDirective implements ControlValueAccessor {
  private unsubscriber: Subject<void> = new Subject<void>();

  constructor(
    private select: SelectComponent
  ) {
    select.selectedChange.pipe(takeUntil(this.unsubscriber)).subscribe((value: any) => {
      if (Array.isArray(value)) {
        this.onChangeCallback([...value]);
      } else {
        this.onChangeCallback(value);
      }
    });

    select.active$.pipe(takeUntil(this.unsubscriber)).subscribe((active: boolean) => {
      if (!active) {
        this.onTouchedCallback();
      }
    });
  }

  writeValue(value: any): void {
    this.select.selected = value;
  }

  registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedCallback = fn;
  }

  private onChangeCallback = (value: any) => { };
  private onTouchedCallback = () => { };
}

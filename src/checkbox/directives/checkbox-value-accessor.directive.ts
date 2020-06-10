import { Directive, OnInit, OnDestroy } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { CheckboxComponent, CheckboxChange } from '..';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Directive({
  selector: 'mill-checkbox[ngModel], mill-checkbox[formControl], mill-checkbox[formControlName]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: CheckboxValueAccessorDirective,
      multi: true
    }
  ]
})

export class CheckboxValueAccessorDirective implements ControlValueAccessor, OnInit, OnDestroy {
  private unsubscribe: Subject<any> = new Subject();

  constructor(
    private checkboxComponent: CheckboxComponent
  ) { }

  public ngOnInit(): void { }

  public writeValue(value: boolean | string): void {
    this.checkboxComponent.checked = value === true || value === 'true';
  }

  public registerOnChange(onChangeCallback: any): void {

    // Need to set initial value from checkbox
    setTimeout(() => {
      onChangeCallback(!!this.checkboxComponent.checked);
    });

    this.checkboxComponent.changeEventEmitter
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((e: CheckboxChange) => {
        this.onTouched();
        onChangeCallback(e.checked);
      });
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  public ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  public onTouched: () => any = () => { };
}

import { Directive, OnInit, OnDestroy } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { RadioComponent, RadioChange } from '..';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Directive({
  selector: 'mill-radio[ngModel], mill-radio[formControl], mill-radio[formControlName]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: RadioValueAccessorDirective,
      multi: true
    }
  ]
})

export class RadioValueAccessorDirective implements ControlValueAccessor, OnInit, OnDestroy {
  private unsubscribe: Subject<any> = new Subject();

  constructor(
    private radioComponent: RadioComponent
  ) { }

  public ngOnInit(): void { }

  public writeValue(value: boolean | string): void {
    this.radioComponent.checked = value === true || value === 'true';
  }

  public registerOnChange(onChangeCallback: any): void {

    // Need to set initial value from checkbox
    setTimeout(() => {
      onChangeCallback(!!this.radioComponent.checked);
    });

    this.radioComponent.changeEventEmitter
      .pipe(takeUntil(this.unsubscribe))
      .subscribe((e: RadioChange) => {
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

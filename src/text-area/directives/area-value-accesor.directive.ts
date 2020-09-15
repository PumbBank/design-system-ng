import { Directive, ElementRef, HostListener, forwardRef, AfterContentInit, AfterViewInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TextAreaComponent } from '../components/text-area/text-area.component';

@Directive({
  selector: 'mill-text-area[ngModel], mill-text-area[formControl], mill-text-area[formControlName]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AreaValueAccesorDirective),
      multi: true
    }
  ]
})
export class AreaValueAccesorDirective implements ControlValueAccessor{

  constructor(private textAreaComponent: TextAreaComponent) { 
    textAreaComponent.textAreaValue$.subscribe((value: string) => {
      this.onChangeFn(value); 
    });
  }

  writeValue(value: any): void {    
    this.textAreaComponent.value = value;
  }
  registerOnChange(fn: any): void {
    this.onChangeFn = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouchedFn = fn;
  }

  private onChangeFn = (val: any) => {};
  private onTouchedFn = () => {};


}

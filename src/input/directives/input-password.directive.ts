import {
  ChangeDetectorRef,
  Directive,
  ElementRef,
  forwardRef, OnChanges,
  OnDestroy,
  Renderer2,
  SimpleChanges
} from '@angular/core';
import { ControlValueAccessor, FormGroupDirective, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CleanFunction, MillInput } from '../component/input';
import { DomService } from '../../utils/services/dom.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Directive({
  selector: '[millInput="password"], [millInput="password"]:not([type])',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputPasswordDirective),
      multi: true
    }
  ]
})
export class InputPasswordDirective extends MillInput implements ControlValueAccessor, OnDestroy, OnChanges {
  private _destroyed$: Subject<void> = new Subject<void>();

  constructor(
    private _cdr: ChangeDetectorRef,
    renderer: Renderer2,
    public inputElementRef: ElementRef,
    public domService: DomService
  ) {
    super(inputElementRef.nativeElement, renderer, domService);
    this.inputElementRef.nativeElement.type = 'password';
    this.registerOnUpdateIcon();
  }

  ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);
  }

  ngOnDestroy(): void {
    this._destroyed$.next();
    this._destroyed$.complete();
    super.ngOnDestroy();
  }

  registerOnChange(fn: (v: string | number) => void): void {
    super.registerOnChange((value: string) => fn(value));
  }

  writeValue(value: string): void {
    super.writeValue(value);
  }

  protected cleanFunction: CleanFunction = (inputValue: string): any => {
    this.input.value = inputValue;
    return this.input.value;
  }

  private registerOnUpdateIcon(): void {
    super.onUpdateIconCallback = () => {
      this.iconClick.pipe(takeUntil(this._destroyed$)).subscribe(() => this.iconClickListener());
    };
  }

  private iconClickListener(): void {
    if ('lock-pass' === this.icon) {
      this.changeIcon('unlock-pass');
      this.inputElementRef.nativeElement.type = 'text';
    } else {
      this.changeIcon('lock-pass');
      this.inputElementRef.nativeElement.type = 'password';
    }
  }
}

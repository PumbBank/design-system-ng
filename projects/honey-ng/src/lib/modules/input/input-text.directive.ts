import { FuuiInput } from './fuui-input';
import { Directive, Renderer2, ElementRef, forwardRef, Injector, OnInit, OnDestroy } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormControlDirective } from '@angular/forms';
import { Subscription } from 'rxjs/internal/Subscription';

@Directive({
  selector: '[fuuiInput]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputTextDirective),
      multi: true
    }
  ]
})
export class InputTextDirective implements ControlValueAccessor, OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];

  control: FormControlDirective;
  fuuiInput: FuuiInput;

  get value(): string {
    return this.fuuiInput.value.value;
  }

  constructor(
    private renderer: Renderer2,
    private inputElementRef: ElementRef,
    private injector: Injector,
  ) { }

  ngOnInit() {
    try {
      this.control = this.injector.get(FormControlDirective);
    } catch (e) {
      console.warn('Can not use input without FormControl');
    }

    this.fuuiInput = new FuuiInput(this.inputElementRef.nativeElement, this.renderer);

    this.synchromizeControlAndInputValue();
    this.synchromizeValidationState();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s: Subscription) => {
      s.unsubscribe();
    })
  }

  writeValue(value: string) {
    this.fuuiInput.writeValue(value);
  }

  registerOnChange(fn: Function) {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: Function) {
    this.onTouchedCallback = fn;
  }

  onChangeCallback: Function = (value: string) => { };
  onTouchedCallback: Function = () => { };

  private synchromizeControlAndInputValue(): void {
    const s = this.fuuiInput.value.subscribe((value: string) => {
      this.onChangeCallback(value);
    });

    this.subscriptions.push(s);
  }

  private  synchromizeValidationState(): void {
    if (!this.control) { return; }

    const s = this.control.update.subscribe(() => {
      this.fuuiInput.updateValidationState(this.control.invalid);
    });

    this.subscriptions.push(s);
  }
}

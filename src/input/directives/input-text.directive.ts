import { Directive, Renderer2, ElementRef, forwardRef, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormGroupDirective } from '@angular/forms';
import { DomService } from 'src/autocomplete/services/dom.service';
import { createTextMaskInputElement } from 'text-mask-core';

import { MillInput, CleanFunction } from '../component/input';

@Directive({
  selector: '[millInput="text"][type="text"], [millInput="text"]:not([type])',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputTextDirective),
      multi: true
    }
  ]
})
export class InputTextDirective extends MillInput implements ControlValueAccessor, OnInit, OnChanges {
  private textMaskInput: any;

  @Input() mask: Array<string | RegExp>;
  @Input() cleanFn: any;

  constructor(
    renderer: Renderer2,
    public inputElementRef: ElementRef,
    public parentForm: FormGroupDirective,
    public domService: DomService
  ) {
    super(inputElementRef.nativeElement, renderer, parentForm, domService);
  }

  ngOnInit(): void {
    this.initTextMask();
  }

  ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);
    if (changes.mask) {
      if (this.textMaskInput) {
        delete this.textMaskInput;
      }
      this.initTextMask();
    }
  }

  registerOnChange(fn: (v: string | number) => void): void {
    super.registerOnChange((value: string) => fn(value));
  }

  writeValue(value: string): void {
    super.writeValue(value);
  }

  protected cleanFunction: CleanFunction = (inputValue: string): any => {
    this.input.value = inputValue;
    if (this.textMaskInput) {
      this.textMaskInput.update();
    }
    return this.cleanFn ? this.cleanFn(this.input.value) : this.input.value;
  }

  private initTextMask(): void {
    if (this.mask) {
      this.textMaskInput = createTextMaskInputElement({
        inputElement: this.inputElementRef.nativeElement,
        mask: this.mask,
        keepCharPositions: true
      });
    }
  }
}

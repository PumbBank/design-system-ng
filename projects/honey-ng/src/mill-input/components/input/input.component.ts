import { Component, Input } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'mill-input',
  templateUrl: './input.component.html'
})
export class InputComponent {
  private readonly _value: string;

  @Input() caption: string;
  @Input() placeholder: string;

  @Input()
  public set value(nextValue: string) {
    (this as any)._value = nextValue;
  }
  public get value(): string {
    return this._value;
  }

  onInput(event: Event): void {
    this.internalSetValue((event.target as HTMLInputElement).value);
  }

  internalSetValue(nextValue: string): void {
    (this as any)._value = nextValue;
  }
}

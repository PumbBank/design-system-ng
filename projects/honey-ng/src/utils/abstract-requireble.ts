import { Input } from '@angular/core';

export abstract class RequirebleComponent {
  private _required: boolean;

  @Input()
  get required(): boolean | string { return this._required; }

  set required(value: boolean | string) {
    this._required = value != null && value !== false && `${value}` !== 'false';
  }
}

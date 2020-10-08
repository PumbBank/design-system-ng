import { Inject, Input, OnInit, OnDestroy, Directive } from '@angular/core';
import { MillSelectOption } from '../../select-option';
import { OPTION_REGISTRAR_KEY, MillOptionRegistrar } from '../..';

// Issue with using exported interface without module
// https://github.com/angular/angular-cli/issues/2034#issuecomment-317270354
type MillOptionRegistrarType = MillOptionRegistrar;

@Directive({
  // tslint:disable-next-line:component-selector
  selector: '[millSelectOption]',
})

// @dynamic
export class SelectOptionDirective<K = any, P = any> implements MillOptionRegistrarType, OnDestroy, OnInit {
  option: MillSelectOption<K, P>;

  @Input() key: K;
  @Input() value: string;
  @Inject(OPTION_REGISTRAR_KEY) private optionRegistrar: MillOptionRegistrarType;

  constructor() {}

  ngOnInit(): void {
    this.option = new MillSelectOption(this.key, this.value);
    this.optionRegistrar.registeredOption(this.option);
  }

  ngOnDestroy(): void {
    this.optionRegistrar.unregisteredOption(this.option);
  }

  registeredOption(): void {
  }

  unregisteredOption(): void {
  }
}

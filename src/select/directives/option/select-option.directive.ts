import { Inject, Input, OnInit, OnDestroy, Directive } from '@angular/core';
import { MillSelectOption } from '../../select-option';
import { OPTION_REGISTRAR_KEY, MillOptionRegistrar } from '../without-option-source/option-registrator';

// Issue with using exported interface without module
// https://github.com/angular/angular-cli/issues/2034#issuecomment-317270354

type MillOptionRegistrarType = MillOptionRegistrar;
/** @dynamic */
@Directive({
  // tslint:disable-next-line:component-selector
  selector: '[millSelectOption]',
})

export class SelectOptionDirective<K = any, P = any> implements OnDestroy, OnInit {
  option: MillSelectOption<K, P>;

  @Input() key: K;
  @Input() value: string;
  constructor(@Inject(OPTION_REGISTRAR_KEY) private optionRegistrar: MillOptionRegistrarType
  ) { }

  ngOnInit(): void {
    this.option = new MillSelectOption(this.key, this.value);
    this.optionRegistrar?.registeredOption(this.option);
  }

  ngOnDestroy(): void {
    this.optionRegistrar?.unregisteredOption(this.option);
  }
}

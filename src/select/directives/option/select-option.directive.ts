import { Inject, Input, OnInit, OnDestroy, Directive } from '@angular/core';
import { MillSelectOption } from '../../select-option';
import { OPTION_REGISTRATOR_KEY, MillOptionRegistrator } from '../without-option-source/option-registrator';

@Directive({
  // tslint:disable-next-line:component-selector
  selector: '[millSelectOption]',
})
export class SelectOptionDirective<K = any> implements OnDestroy, OnInit {
  option: MillSelectOption<K>;

  @Input() key: K;
  @Input() value: string;

  constructor(
    @Inject(OPTION_REGISTRATOR_KEY) private optionRegistrator: MillOptionRegistrator
  ) { }

  ngOnInit(): void {
    this.option = new MillSelectOption(this.key, this.value);
    this.optionRegistrator.registrateOption(this.option);
  }

  ngOnDestroy(): void {
    this.optionRegistrator.unregistrateOption(this.option);
  }
}

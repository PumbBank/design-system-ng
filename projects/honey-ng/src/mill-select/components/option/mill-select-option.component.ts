import { Component, Inject, Input, OnInit, OnDestroy } from '@angular/core';
import { MillOptionRegistrator, OPTION_REGISTRATOR_KEY } from '../../mill-option-registrator';
import { MillSelectOption } from '../../mill-select-option';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'mill-select-option',
  template: `
    <div class="option">
      <div class="option__text"></div>
    </div>
  `
})
export class MillSelectOptionComponent<K = any> implements OnDestroy, OnInit {
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

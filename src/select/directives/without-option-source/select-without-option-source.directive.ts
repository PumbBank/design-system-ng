import { BehaviorSubject, Subject } from 'rxjs';
import { Directive, AfterContentInit, forwardRef } from '@angular/core';
import { MillOptionRegistrator, OPTION_REGISTRATOR_KEY } from './option-registrator';
import { filter, map } from 'rxjs/operators';
import { SelectComponent } from '../../components/select/select.component';
import { MillSelectOption } from '../../select-option';
import { InactiveBodyMode } from '../../components/select/abstract-select-state';

@Directive({
  selector: 'mill-select:not([optionSource])',
  providers: [{
    provide: OPTION_REGISTRATOR_KEY,
    useExisting: forwardRef(() => SelectWithoutOptionSourceDirective)
  }]
})
export class SelectWithoutOptionSourceDirective<K = any, P = any> implements MillOptionRegistrator, AfterContentInit {
  private initSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private options = new Map<K, MillSelectOption<K, P>>();

  constructor(
    private millSelectComponent: SelectComponent<K, P>
  ) {
    this.millSelectComponent.inactiveBodyMode = InactiveBodyMode.NOT_VISIBLE;
    this.initOptionSource();
  }

  ngAfterContentInit(): void {
    this.initSubject.next(true);
  }

  registrateOption(option: MillSelectOption<K, P>): void {
    if (this.options.has(option.key)) {
      throw new Error(`[MillSelectWithoutOptionSourceDirective] Duplicate registration option: ${JSON.stringify(option)}`);
    }
    this.options.set(option.key, option);
    this.onchangesCallback();
  }

  unregistrateOption(option: MillSelectOption<K, P>): void {
    if (!this.options.has(option.key)) {
      throw new Error(`[MillSelectWithoutOptionSourceDirective] Try unregistrate unregistrated option: ${JSON.stringify(option)}`);
    }
    this.options.delete(option.key);
  }

  private initOptionSource() {
    const _this = this;

    this.millSelectComponent.optionSource = {
      registerOnChanges: (onchangesCallback: () => void) => {
        _this.onchangesCallback = onchangesCallback;
      },

      inited: () => {
        if (_this.initSubject.value) {
          return Promise.resolve();
        } else {
          return this.initSubject.pipe(
            filter((value: boolean) => value),
            map(() => undefined)
          ).toPromise();
        }
      },

      get: (key: K) => Promise.resolve(_this.options.get(key)),
      search: (query: string) => Promise.resolve(
        Array.from(this.options.values())
          .filter((option: MillSelectOption<K, P>) => {
            return option.value.toLowerCase().indexOf(query.toLowerCase()) > -1;
          })
      )
    };
  }

  private onchangesCallback: () => void = () => { };
}

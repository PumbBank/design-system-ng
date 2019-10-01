import { BehaviorSubject, Subject } from 'rxjs';
import { Directive, AfterContentInit, forwardRef } from '@angular/core';
import { MillOptionRegistrator, OPTION_REGISTRATOR_KEY } from './mill-option-registrator';
import { MillSelectOption } from './mill-select-option';
import { filter, map } from 'rxjs/operators';
import { MillSelectComponent } from './components/select/mill-select.component';

@Directive({
  selector: 'mill-select:not([optionSource])',
  providers: [{
    provide: OPTION_REGISTRATOR_KEY,
    useExisting: forwardRef(() => MillSelectWithoutOptionSourceDirective)
  }]
})
export class MillSelectWithoutOptionSourceDirective<K = any, P = any> implements MillOptionRegistrator, AfterContentInit {
  private initSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private options = new Map<K, MillSelectOption<K, P>>();
  private onChanges$ = new Subject<void>();

  constructor(
    millSelectComponent: MillSelectComponent<K, P>
  ) {
    const _this = this;

    millSelectComponent.optionSource = {
      onChanges$: _this.onChanges$,

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

    (window as any).ass = millSelectComponent.optionSource;
  }

  ngAfterContentInit(): void {
    this.initSubject.next(true);
  }

  registrateOption(option: MillSelectOption<K, P>): void {
    if (this.options.has(option.key)) {
      throw new Error(`[MillSelectWithoutOptionSourceDirective] Duplicate registration option: ${JSON.stringify(option)}`);
    }
    this.options.set(option.key, option);
    this.onChanges$.next();
  }

  unregistrateOption(option: MillSelectOption<K, P>): void {
    if (!this.options.has(option.key)) {
      throw new Error(`[MillSelectWithoutOptionSourceDirective] Try unregistrate unregistrated option: ${JSON.stringify(option)}`);
    }
    this.options.delete(option.key);
  }
}

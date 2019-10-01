import { MillSelectOption } from './mill-select-option';
import { Observable, Subject } from 'rxjs';

export interface MillOptionSource<K = any, P = any, Q = any> {
  onChanges$: Observable<void>;

  /**
   * @description Promis that wait initing of source and resolve after option-source inited.
   * if you option-source is sync use 'return Promise.resolve()'
   */
  inited?(): Promise<void>;

  /**
   * @description Search option by key
   */
  get(key: K): Promise<MillSelectOption<K, P>>;

  /**
   * @description Search options by query
   */
  search(query: Q): Promise<Array<MillSelectOption<K, P>>>;
}

export class SimpleOptionSource<K = any, P = any> implements MillOptionSource<K, P, string> {
  onChanges$ = new Subject<void>();

  constructor(private options: Array<MillSelectOption<K, P>>) { }

  inited(): Promise<void> {
    return Promise.resolve();
  }

  search(query: string): Promise<Array<MillSelectOption<K, P>>> {
    return Promise.resolve(
      this.options.filter((option: MillSelectOption<K, P>) => {
        return option.value.toLowerCase().indexOf(query.toLowerCase()) > -1;
      }));
  }

  get(key: K): Promise<MillSelectOption<K, P>> {
    return Promise.resolve(
      this.options.find((option: MillSelectOption<K, P>) => option.key === key)
    );
  }
}

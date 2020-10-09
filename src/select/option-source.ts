import { MillSelectOption } from './select-option';

type MillSelectOptionType = MillSelectOption;

export interface MillOptionSource<K = any, P = any, Q = any> {
  registerOnChanges?(onchangeCallback: () => void): void;

  /**
   * @description Promis that wait initing of source and resolve after option-source inited.
   * if you option-source is sync use 'return Promise.resolve()'
   */
  inited?(): Promise<void>;

  /**
   * @description Search option by key
   */
  get(key: K): Promise<MillSelectOptionType>;

  /**
   * @description Search options by query
   */
  search(query: Q): Promise<Array<MillSelectOptionType>>;
}

export class SimpleOptionSource<K = any, P = any> implements MillOptionSource<K, P, string> {

  constructor(private options: Array<MillSelectOptionType>) { }

  inited(): Promise<void> {
    return Promise.resolve();
  }

  search(query: string): Promise<Array<MillSelectOptionType>> {
    return Promise.resolve(
      this.options.filter((option: MillSelectOptionType) => {
        return option.value.toLowerCase().indexOf(query.toLowerCase()) > -1;
      }));
  }

  get(key: K): Promise<MillSelectOptionType> {
    return Promise.resolve(
      this.options.find((option: MillSelectOptionType) => option.key === key)
    );
  }
}

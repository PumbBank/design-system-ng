import { MillSelectOption } from './../../mill-select-option';
import { Input, OnInit, EventEmitter, Output } from '@angular/core';
import { MillOptionSource } from '../../mill-option-source';
import { BehaviorSubject } from 'rxjs';
import { DEBUG, debugLog } from '../../../utils/degug-log';


export abstract class AbstractSelectOptions<K = any, P = any> implements OnInit {
  private _multiple: boolean = false;
  private _selectedOption: MillSelectOption<K, P> | Array<MillSelectOption<K, P>>;
  private _selected: K | Array<K>;

  searchInputValue = '';

  @Input() optionSource: MillOptionSource<K, P>;

  /**
   * @description Enable selecting more then one option
   */
  @Input()
  public set multiple(value: boolean) {
    this._multiple = value;
    if (!Array.isArray(this.selected)) {
      this._selected = [];
      this._selectedOption = [];
    }
  }
  public get multiple(): boolean {
    return this._multiple;
  }

  get single(): boolean {
    return !this.multiple;
  }

  /**
   * @description Key o selected option
   */
  @Input()
  public set selected(value: K | Array<K>) {
    this.setSelected(value);
  }

  public get selected(): K | Array<K> {
    return this._selected;
  }

  @Output() selectedChange = new EventEmitter<K | Array<K>>();

  /**
   * @description Selected option
   */
  get selectedOption(): MillSelectOption<K, P> | Array<MillSelectOption<K, P>> {
    return this._selectedOption;
  }

  options$ = new BehaviorSubject<Array<MillSelectOption<K, P>>>([]);

  ngOnInit(): void {
    this.waitForSettingOptionSource().then(() => {
      if (this.optionSource.registerOnCanhges) {
        this.optionSource.registerOnCanhges(() => {
          if (DEBUG) { debugLog(`[AbstractSelectOptions] this.optionSource.registerOnCanhges > onchangeCallback`); }
          this.loadOptionsFromSource();
        });
      }
    });
  }

  clearSelected(): void {
    if (DEBUG) { debugLog(`[AbstractSelectOptions] clearSelected`); }

    if (this.single) {
      this.clearSelectedForSingle();
    } else {
      // TODO
    }
  }

  checkIsOptionSelected(option: MillSelectOption<K, P>): boolean {
    // if (DEBUG) { debugLog(`[AbstractSelectOptions] checkIsOptionSelected`, `#7c8288`); }

    if (this.single) {
      return this.selected === option.key;
    } else {
      return (this.selected as any).includes(option.key);
    }
  }

  protected async selectOption(option: MillSelectOption<K, P>): Promise<void> {
    if (DEBUG) { debugLog(`[AbstractSelectOptions] selectOption`); }

    if (this.multiple) {
      await this.setOptionForMultiple(option);
    } else {
      await this.setOptionForSingle(option);
    }

    this.selectedChange.emit(this.selected);
    return Promise.resolve();
  }

  protected unselectOption(option: MillSelectOption<K, P>) {
    if (DEBUG) { debugLog(`[AbstractSelectOptions] unselectOption ${JSON.stringify(option)}`); }

    if (!Array.isArray(this._selectedOption) || !Array.isArray(this._selected)) {
      throw new Error(`[AbstractSelectOptions] _selectedOption && _selected must be Array ;(`);
    }

    this._selectedOption.splice(this._selectedOption.indexOf(option), 1);
    this._selected.splice(this._selected.indexOf(option.key), 1);


    this.selectedChange.emit(this.selected);
  }

  protected async loadOptionsFromSource(query: string = ''): Promise<any> {
    if (DEBUG) { debugLog(`[AbstractSelectOptions] loadOptionsFromSource ${query}`); }

    await this.waitForSettingOptionSource();

    this.options$.next(await this.optionSource.search(query));
  }

  protected async setOptionForSingle(option: MillSelectOption<K, P>): Promise<void> {
    if (DEBUG) { debugLog(`[AbstractSelectOptions] setOptionForSingle ${JSON.stringify(option)}`); }

    if (!Array.isArray(this.selected) && !Array.isArray(this.selectedOption)) {
      await this.setSelected(option.key);

      return Promise.resolve();
    } else {
      throw new Error(`[MillSelectComponent] selcted and selectedOptions for single seclect must not be array!`);
    }
  }


  private setOptionForMultiple(option: MillSelectOption<K, P>) {
    if (DEBUG) { debugLog(`[AbstractSelectOptions] setOptionForMultiple ${JSON.stringify(option)}`); }

    if (Array.isArray(this.selected) && Array.isArray(this.selectedOption)) {
      if (this.selected.includes(option.key)) {
        this.selected.splice(this.selected.indexOf(option.key), 1);
        this.selectedOption.splice(this.selectedOption.indexOf(option), 1);
      } else {
        this.selected.push(option.key);
        this.selectedOption.push(option);
      }
    } else {
      throw new Error(`[MillSelectComponent] selcted and selectedOptions for multiple seclect must be array!`);
    }
  }

  private clearSelectedForSingle() {
    if (DEBUG) { debugLog(`[AbstractSelectOptions] clearSelectedForSingle ${JSON.stringify(this.selected)}`); }

    if (!Array.isArray(this.selected) && !Array.isArray(this.selectedOption)) {
      this._selected = null;
      this._selectedOption = null;
    } else {
      throw new Error(`[MillSelectComponent] selcted and selectedOptions for single seclect must not be array!`);
    }
  }

  private async setSelected(value: K | Array<K>): Promise<void> {
    if (this.single) {
      if (Array.isArray(value)) {
        throw Error('[MillSelectComponent] You con\'t set array as selected for not multiple select!');
      }

      const setSelectedForSingle = async () => {
        await this.optionSource.get(value as K).then((option: MillSelectOption<K, P>) => {
          if (!option) { return; }
          this._selected = option.key;
          this._selectedOption = option;
          this.searchInputValue = option.value;
        });

        return Promise.resolve();
      };

      return this.waitForSettingOptionSource()
        .then(() => this.optionSource.inited && this.optionSource.inited())
        .then(() => setSelectedForSingle());

    } else {
      if (!Array.isArray(value)) {
        // throw Error(`[MillSelectComponent] You con\'t set "${value}"(${typeof value}) as selected for multiple select! Array expected!`);
        value = [];
      }

      this._selected = [];
      this._selectedOption = [];

      const setSelectedForMultiple = async () => {
        // (value as Array<K>).forEach((item: K) =>
        for (const item of value as Array<K>) {
          this.optionSource.get(item).then((option: MillSelectOption<K, P>) => {
            if (!option) { return; }
            (this._selected as Array<K>).push(option.key);
            (this._selectedOption as Array<MillSelectOption<K, P>>).push(option);
          });
        }

        return Promise.resolve();
      };

      return this.waitForSettingOptionSource()
        .then(() => this.optionSource.inited && this.optionSource.inited())
        .then(() => setSelectedForMultiple());
    }
  }

  private async waitForSettingOptionSource(checkInterval: number = 100): Promise<void> {
    return new Promise((resolve: any) => {
      const tryToSet = () => {
        if (!this.optionSource) {
          setTimeout(() => tryToSet(), 100);
          return;
        }

        resolve();
      };

      tryToSet();
    });
  }
}

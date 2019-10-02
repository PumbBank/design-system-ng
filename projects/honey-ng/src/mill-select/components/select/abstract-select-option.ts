import { MillSelectOption } from './../../mill-select-option';
import { Input, OnInit, EventEmitter, Output } from '@angular/core';
import { debounceTime } from 'rxjs/operators';
import { MillOptionSource } from '../../mill-option-source';
import { BehaviorSubject } from 'rxjs';
import { DEBUG, debugLog } from '../../../utils/degug-log';

interface IMillSelectedChangeEvent<K = any> {
  selected: K | Array<K>;
}

export abstract class AbstractSelectOptions<K = any, P = any> implements OnInit {
  private _selectedOption: MillSelectOption<K, P>;
  private _selected: K | Array<K>;

  searchInputValue = '';

  @Input() optionSource: MillOptionSource<K, P>;

  /**
   * @description Key o selected option
   */
  @Input()
  public set selected(value: K | Array<K>) {

    if (this.single) {
      if (Array.isArray(value)) {
        throw Error('[MillSelectComponent] You con\'t set array as selected for not multiple select!');
      }

      const setSelectedForSingle = () => {
        this.optionSource.get(value).then((option: MillSelectOption<K, P>) => {
          if (!option) { return; }
          this._selected = option.key;
          this._selectedOption = option;
          this.searchInputValue = option.value;
        });
      };

      this.waitForSettingOptionSource().then(() => {
        if (!this.optionSource.inited) {
          setSelectedForSingle();
        }

        this.optionSource.inited().then(() => {
          setSelectedForSingle();
        });
      });

    }
  }

  public get selected(): K | Array<K> {
    return this._selected;
  }

  @Output() selectedChange = new EventEmitter<IMillSelectedChangeEvent<K>>();

  /**
   * @description Selected option
   */
  get selectedOption(): MillSelectOption<K, P> | Array<MillSelectOption<K, P>> {
    return this._selectedOption;
  }

  /**
   * @description Enable selecting more then one option
   */
  @Input() multiple: boolean = false;

  get single(): boolean {
    return !this.multiple;
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
      this.setOptionForMultiple(option);
    } else {
      this.setOptionForSingle(option);
    }
    this.selectedChange.emit({ selected: this.selected });

    return Promise.resolve();
  }

  protected async loadOptionsFromSource(query: string = ''): Promise<any> {
    if (DEBUG) { debugLog(`[AbstractSelectOptions] loadOptionsFromSource ${query}`); }

    if (this.optionSource.inited) {
      await this.optionSource.inited();
    }

    this.options$.next(await this.optionSource.search(query));
  }

  protected setOptionForSingle(option: MillSelectOption<K, P>) {
    if (DEBUG) { debugLog(`[AbstractSelectOptions] setOptionForSingle ${JSON.stringify(option)}`); }

    if (!Array.isArray(this.selected) && !Array.isArray(this.selectedOption)) {
      this.selected = option.key;
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
      this.selected = null;
    } else {
      throw new Error(`[MillSelectComponent] selcted and selectedOptions for single seclect must not be array!`);
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

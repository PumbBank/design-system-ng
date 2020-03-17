import {
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostListener,
  Input,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BehaviorSubject, fromEvent } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

interface ListInterface {
	value: any;
	isHistory: boolean;
}

interface OutputInterface {
	value: string;
}

enum KeyEnum {
	keyUp = 'ArrowUp',
	keyDown = 'ArrowDown',
	enter = 'Enter'
}

@Component({
	selector: 'mill-search',
	templateUrl: './search-input.component.html',
	styleUrls: ['./search-input.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => SearchInputComponent),
			multi: true,
		}
	],
  encapsulation: ViewEncapsulation.None
})
export class SearchInputComponent implements OnInit, ControlValueAccessor {

  /** State for the whole input */
	public active = false;

  /** Selected item index */
	public activeItemIndex = -1;

  /** Customize width */
	@Input() public width: number;

  /** Disable state */
	@Input() public disabled = false;

  /** While async true, component output object with current value and wait for the search list */
	@Input() public async = false;

  /** Placeholder for the input */
	@Input() public placeholder = 'Placeholder';

  /** Search input, */
	public inputValue = new FormControl();

  /** Array of elements to show in UI */
	public showList: ListInterface[] = [];

  /** Array of elements saved in local storage */
	private _historyList: ListInterface[] = [];

  /** Observable with searched values */
	private _resultList: BehaviorSubject<ListInterface[]> = new BehaviorSubject<ListInterface[]>([]);

  /** State for the prevent searching, while keys (up, down, enter) pressed */
	private _keyActive: boolean;

  /** Transform objects to the strings ang push to the result array */
	@Input('list')
	set resultList(value: any[]) {
		const arr = [];

		value.forEach(item => {
			const obj = {
				value: '',
				isHistory: false,
			};
			for (const key in item) {
				if (item.hasOwnProperty(key)) {
					obj.value += `${item[key]} `;
				}
			}
			obj.value = obj.value.trim();
			arr.push(obj);
		});

		this._resultList.next(arr);
	}

  /** Output object with value */
	@Output('search') public searchOutput: EventEmitter<OutputInterface> = new EventEmitter<OutputInterface>();

  /** View input element ref */
  @ViewChild('inputEl', {static: true})
  public inputEl: ElementRef;

  /** Disable active when clicked outside input */
  @HostListener('document:click', ['$event.target'])
  public clickOutside(target) {
    if (!this._elementRef.nativeElement.contains(target)) {
      this.active = false;
    }
  }

  constructor(private _elementRef: ElementRef)  {
	}

	ngOnInit() {
    // Subscribe to input value changes
    this.inputValue.valueChanges
      .pipe(
        startWith(''),
        map(value => value && value.match(/^\s$/) ? this.inputValue.setValue('') : value),
      )
      .subscribe(value => {
        // If key(up, down, enter) pressed do not start filter
        if (!this._keyActive) {
          if (!this.async) {
            this._filterSearch(value);
          }
        }
      });

    // Subscribe to the keydown event
    fromEvent<KeyboardEvent>(this.inputEl.nativeElement, 'keydown')
      .subscribe(event => {
        // If event key is equal to (up, down, enter) call key method
        if (event.key === KeyEnum.keyDown || event.key === KeyEnum.keyUp || event.key === KeyEnum.enter) {
          if (!this._keyActive) {
            this._keyActive = true;
          }
          this.onKey(event);
        } else {
          if (this._keyActive) {
            this._keyActive = false;
          }
        }
      });

    const history = localStorage.getItem('historyList');

    if (history) {
      const parsedHistory = JSON.parse(history);
      this._historyList = parsedHistory;
    }

	  if (this.async) {
	    this._resultList.subscribe(result => {
	      // If result list exist concat him with history, otherwise show last 4 elements from history list
        if (result && result.length > 0) {
          const history = this._filter(this._historyList, this.inputValue.value);
          this.showList = history.concat(result);
        } else {
          this.showList = this._historyList.slice(0, 4);
        }
      })
    }
	}

  /** Concat history and result list */
	private _filterSearch(value: string): void {
		if (value) {
			const history = this._filter(this._historyList, value);
			const result = this._filter(this._resultList.getValue(), value);

			this.showList = history.concat(result);
		} else {
			this.showList = this._historyList.slice(0, 4);
		}
		this._onTouched();
	}

  /** Filter array with input value */
	private _filter(array: ListInterface[], value: string): ListInterface[] {
		if (!array || array.length === 0) {
			return [];
		}

		const filterValue = value.toLowerCase();

		return array.filter(result => result.isHistory
			? result.value.toLowerCase().indexOf(filterValue) === 0
			: result.value.toLowerCase().indexOf(filterValue) !== -1);
	}

  /** Set active state on focus */
	public onFocus(): void {
		if (this.disabled) {
			return;
		}

		this.active = true;

		if (!this.inputValue.value) {
			this._filterSearch(null);
		}
	}

  /** Reset form control */
	public clearInput(): void {
		this.inputValue.reset();
	}

  /** Key events for the input */
	public onKey(event: KeyboardEvent): void {
		// Enter, trigger search
		if (event.key === KeyEnum.enter) {
			this.onSearch(this.inputValue.value);
			this.inputEl.nativeElement.blur();
			this.active = false;
		}
		// Arrow up, increment active item index and set value to the input
		if (event.key === KeyEnum.keyUp && this.showList.length > 0) {
		  event.preventDefault();

			if (this.activeItemIndex !== -1) {
				this.activeItemIndex === 0 ? this.activeItemIndex = this.showList.length - 1 : this.activeItemIndex--;
        this.inputValue.setValue(this.showList[this.activeItemIndex].value);
			} else {
				this.activeItemIndex = this.showList.length - 1;
			}
		}
		// Arrow down, decrement active item index and set value to the input
		if (event.key === KeyEnum.keyDown && this.showList.length > 0) {
      if (this.activeItemIndex !== -1) {
        this.activeItemIndex === this.showList.length - 1 ? this.activeItemIndex = 0 : this.activeItemIndex++;
        this.inputValue.setValue(this.showList[this.activeItemIndex].value);
      } else {
        this.activeItemIndex = 0;
      }
		}
	}

  /** Remove record from history (local storage) */
	public removeFromHistory(event, value: string): void {
		event.stopPropagation();

    this._historyList = this._historyList.filter(item => item.value !== value);
		this._saveToLocalStorage();

		// Trigger changes after
		this.inputValue.updateValueAndValidity();
	}

  /** Update history list with new search value */
	public onSearch(value: string): void {
		if (!value || !value.trim()) {
			return;
		}

		// Clear show array;
		this.showList = [];

		const list = this._historyList.length > 0 ? this._historyList.filter(item => item.value !== value) : [];

		const obj = {
			value: value,
			isHistory: true
		};

		list.unshift(obj);
		this._historyList = list;

		this.searchOutput.emit({value});
		this._saveToLocalStorage();
	}

  /** Write value to the input and trigger search */
	public setInputValue(value: string): void {
		this.inputValue.setValue(value);
		this.onSearch(this.inputValue.value);
	}

  /** Return formatted value */
	public resultStr(item: string): string[] {
		const reg = new RegExp(`(${this.inputValue.value})`, 'i');

		return item.split(reg).filter(i => i.length > 0);
	}

  /** Save history list to the local storage */
	private _saveToLocalStorage(): void {
		localStorage.setItem('historyList', JSON.stringify(this._historyList));
	}

  /** Modify result option text with bold style */
	public isBold(value: string, isHistory: boolean, index): boolean {
		const input = this.inputValue.value ? this.inputValue.value.toLowerCase() : '';
		value = value.toLowerCase();

		return isHistory ? input && index > 0 : input === value;
	}

  /** Control value accessor methods */
	private _onTouched: any = () => {
	};

	public registerOnChange(fn: any): void {
		this.inputValue.valueChanges.subscribe(fn);
	}

	public registerOnTouched(fn: any): void {
		this._onTouched = fn;
	}

	public setDisabledState(isDisabled: boolean): void {
		this.disabled = isDisabled;
	}

	public writeValue(value: string): void {
		if (value) {
      this.inputValue.setValue(value);
      if (!this.active) {
        this.active = true;
      }
    }
	}
}

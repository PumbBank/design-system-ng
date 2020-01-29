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
import { map, startWith, filter } from 'rxjs/operators';

interface ListInterface {
	value: any;
	isHistory: boolean;
}

interface DataInterface {
	f: string;
	s: string;
	l: string;
}

interface OutputInterface {
	value: string;
}

enum KeyCodeEnum {
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

	public active = false;
	public activeItemIndex = -1;

	@Input() public width: number;
	@Input() public disabled = false;
	@Input() public async = false;

	public inputValue = new FormControl();

	public showList: ListInterface[] = [];
	public historyList: ListInterface[] = [];
	private _resultList: BehaviorSubject<ListInterface[]> = new BehaviorSubject<ListInterface[]>([]);

	private _pause: boolean;

	@Input('list')
	set resultList(value: DataInterface[]) {
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

	@Output('search') public searchOutput: EventEmitter<OutputInterface> = new EventEmitter<OutputInterface>();

  @ViewChild('inputEl', {static: true})
  public inputEl: ElementRef;

  @HostListener('document:click', ['$event.target'])
  public clickOutside(target) {
    if (!this._elementRef.nativeElement.contains(target)) {
      this.active = false;
    }
  }

  constructor(private _elementRef: ElementRef)  {
	}

	ngOnInit() {
    this.inputValue.valueChanges
      .pipe(
        startWith(''),
        map(value => value && value.match(/^\s$/) ? this.inputValue.setValue('') : value),
      )
      .subscribe(value => {
        if (!this._pause) {
          if (!this.async) {
            this._filterSearch(value);
          }
          this.searchOutput.emit({value});
        }
      });

    fromEvent(this.inputEl.nativeElement, 'keydown')
      .pipe(
        filter(v => {
          const ev = v as KeyboardEvent;
          return ev.key === KeyCodeEnum.keyDown || ev.key === KeyCodeEnum.keyUp || ev.key === KeyCodeEnum.enter
        }),
      )
      .subscribe(event => {
        this._pause = true;
        this.onKeyUp(event);
        this._pause = false;
      });

    const history = localStorage.getItem('historyList');

    if (history) {
      const parsedHistory = JSON.parse(history);
      this.historyList = parsedHistory;
    }

	  if (this.async) {
	    this._resultList.subscribe(result => {
        this._filterSearch(this.inputValue.value);
      })
    }
	}

	private _filterSearch(value: string): void {
		if (value) {
			const history = this._filter(this.historyList, value);
			const result = this._filter(this._resultList.getValue(), value);

			this.showList = history.concat(result);
		} else {
			this.showList = this.historyList.slice(0, 4);
		}
		this._onTouched();
	}

	private _filter(array: ListInterface[], value: string): ListInterface[] {
		if (!array || array.length === 0) {
			return [];
		}

		const filterValue = value.toLowerCase();

		return array.filter(result => result.isHistory
			? result.value.toLowerCase().indexOf(filterValue) === 0
			: result.value.toLowerCase().indexOf(filterValue) !== -1);
	}

	public onFocus(): void {
		if (this.disabled) {
			return;
		}

		this.active = true;

		if (!this.inputValue.value) {
			this._filterSearch(null);
		}
	}

	public clearInput(): void {
		this.inputValue.setValue(null);
		this.onFocus();
	}

	public onKeyUp(event): void {
		// Enter
		if (event.key === KeyCodeEnum.enter) {
			this.onSearch(this.inputValue.value);
			this.inputEl.nativeElement.blur();
			this.active = false;
		}
		// Arrow up
		if (event.key === KeyCodeEnum.keyUp && this.showList.length > 0) {
		  event.preventDefault();

			if (this.activeItemIndex !== -1) {
				this.activeItemIndex === 0 ? this.activeItemIndex = this.showList.length - 1 : this.activeItemIndex--;
        this.inputValue.setValue(this.showList[this.activeItemIndex].value);
			} else {
				this.activeItemIndex = this.showList.length - 1;
			}
		}
		// Arrow down
		if (event.key === KeyCodeEnum.keyDown && this.showList.length > 0) {
      if (this.activeItemIndex !== -1) {
        this.activeItemIndex === this.showList.length - 1 ? this.activeItemIndex = 0 : this.activeItemIndex++;
        this.inputValue.setValue(this.showList[this.activeItemIndex].value);
      } else {
        this.activeItemIndex = 0;
      }
		}
	}

	public removeFromHistory(event, value: string): void {
		event.stopPropagation();

    this.historyList = this.historyList.filter(item => item.value !== value);
		this._saveToLocalStorage();

		this.inputValue.updateValueAndValidity();
	}

	public onSearch(value: string): void {
		if (!value || !value.trim()) {
			return;
		}

		this.showList = [];

		const list = this.historyList.length > 0 ? this.historyList.filter(item => item.value !== value) : [];

		const obj = {
			value: value,
			isHistory: true
		};

		list.unshift(obj);
		this.historyList = list;


		this.searchOutput.emit({value});

		this._saveToLocalStorage();
	}

	public setInputValue(value: string): void {
		this.inputValue.setValue(value);
		this.onSearch(this.inputValue.value);
	}

  /**  */
	public resultStr(item: string): string[] {
		const reg = new RegExp(`(${this.inputValue.value})`, 'i');

		return item.split(reg).filter(i => i.length > 0);
	}

	private _saveToLocalStorage(): void {
		localStorage.setItem('historyList', JSON.stringify(this.historyList));
	}

  /** Modify result option text with bold */
	public isBold(value: string, isHistory: boolean, index): boolean {
		const input = this.inputValue.value ? this.inputValue.value.toLowerCase() : '';
		value = value.toLowerCase();

		return isHistory ? input && index > 0 : input === value;
	}

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
		this.inputValue.setValue(value ? value : '');
		this.active = true;
	}

}

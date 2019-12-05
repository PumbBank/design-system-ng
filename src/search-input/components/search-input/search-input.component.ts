import {
	Component,
	ElementRef,
	EventEmitter,
	forwardRef,
	HostListener,
	Input,
	OnInit,
	Output,
	ViewChild
} from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

interface ListInterface {
	value: any;
	isHistory: boolean;
}

interface DataInterface {
	f: string;
	s: string;
	l: string;
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
	]
})
export class SearchInputComponent implements OnInit, ControlValueAccessor {

	public active = false;
	public activeHistory = false;
	public activeItemIndex = -1;

	@Input('disabled') public isDisabled = false;

	public inputValue = new FormControl();

	public showList: ListInterface[] = [];

	public historyList: BehaviorSubject<ListInterface[]> = new BehaviorSubject<ListInterface[]>([]);

	private _resultList: BehaviorSubject<ListInterface[]> = new BehaviorSubject<ListInterface[]>([]);

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

	@Output('search') public searchString: EventEmitter<string> = new EventEmitter<string>();

	constructor(private _elementRef: ElementRef)  {
		this.inputValue.valueChanges.pipe(
			startWith(''),
			map(value => value && value.match(/^\s$/) ? this.inputValue.setValue('') : value)
			// debounceTime(100),
			// distinctUntilChanged()
		).subscribe(value => {
			this._filterSearch(value);
		});

		const history = localStorage.getItem('historyList');

		if (history) {
			const parsedHistory = JSON.parse(history);
			this.historyList.next(parsedHistory);
		}

	}

	@ViewChild('inputEl', {static: false})
	public inputEl: ElementRef;

	@HostListener('document:click', ['$event.target'])
	public clickOutside(target) {
		if (!this._elementRef.nativeElement.contains(target)) {
			this.active = false;
		}
	}

	ngOnInit() {
	}

	private _filterSearch(value: string): void {

		if (value) {
			const history = this._filter(this.historyList.getValue(), value);
			const result = this._filter(this._resultList.getValue(), value);

			this.showList = history.concat(result);
		} else {
			this.showList = this.historyList.getValue();
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

		if (this.isDisabled) {
			return;
		}

		this.active = true;
		this.inputEl.nativeElement.focus();

		if (this.inputValue.value === null) {
			this.activeHistory = true;
			this._filterSearch(null);
		}
	}

	public onBlur(): void {
		this.active = false;
	}

	public clearInput(): void {
		this.inputValue.reset();
	}

	public onKeyUp(event): void {

		if (event.key !== KeyCodeEnum.enter && event.key !== KeyCodeEnum.keyUp && event.key !== KeyCodeEnum.keyDown) {
			this.activeItemIndex = -1;
		}

		// Enter
		if (event.key === KeyCodeEnum.enter) {

			if (this.activeItemIndex !== -1) {
				console.log(this.showList[this.activeItemIndex].value);
				this.inputValue.setValue(this.showList[this.activeItemIndex].value);
				this.activeItemIndex = -1;
			}
			this.onSearch(this.inputValue.value);
		}

		// Arrow up
		if (event.key === KeyCodeEnum.keyUp) {
			if (this.activeItemIndex !== -1) {

				if (this.activeItemIndex === 0) {
					this.activeItemIndex = -1;
				} else {
					this.activeItemIndex--;
				}

			} else {
				this.activeItemIndex = this.showList.length - 1;
			}
		}

		// Arrow down
		if (event.key === KeyCodeEnum.keyDown) {
			if (this.showList.length > 0) {
				if (this.activeItemIndex !== -1) {

					if (this.activeItemIndex === this.showList.length - 1) {
						this.activeItemIndex = -1;
					} else {
						this.activeItemIndex++;
					}

				} else {
					this.activeItemIndex = 0;
				}
			}

		}
	}

	public removeFromHistory(event, value: string): void {
		event.stopPropagation();

		const list = this.historyList.getValue().filter(item => item.value !== value);
		this.historyList.next(list);

		this._saveToLocalStorage();

		this.inputValue.updateValueAndValidity();
	}

	public onSearch(value: string): void {

		if (!value || !value.trim()) {
			return;
		}

		this.showList = [];

		const list = this.historyList.getValue().length > 0 ? this.historyList.getValue().filter(item => item.value !== value) : [];

		const obj = {
			value: value,
			isHistory: true
		};

		list.unshift(obj);
		this.historyList.next(list);

		this.searchString.emit(value);

		this._saveToLocalStorage();
	}

	public setInputValue(value: string): void {
		this.inputValue.setValue(value);
		this.onSearch(this.inputValue.value);
	}

	public resultStr(item: string, ): string[] {
		const reg = new RegExp(`(${this.inputValue.value})`, 'i');

		return item.split(reg).filter(i => i.length > 0);
	}

	private _saveToLocalStorage(): void {
		localStorage.setItem('historyList', JSON.stringify(this.historyList.getValue()));
	}

	public isBold(value: string, isHistory: boolean, index): boolean {
		const input = this.inputValue.value ? this.inputValue.value.toLowerCase() : '';
		value = value.toLowerCase();

		return isHistory ? input && index > 0 : input === value;
	}

	private _onTouched: any = () => {
	};

	registerOnChange(fn: any): void {
		this.inputValue.valueChanges.subscribe(fn);
	}

	registerOnTouched(fn: any): void {
		this._onTouched = fn;
	}

	setDisabledState(isDisabled: boolean): void {
		this.isDisabled = isDisabled;
	}

	writeValue(value: string): void {
		this.inputValue.setValue(value);
	}

}

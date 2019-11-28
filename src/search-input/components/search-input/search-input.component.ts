import { Component, ViewChild, ElementRef, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'mill-search',
	templateUrl: './search-input.component.html',
	styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent implements OnInit {

	public active = false;

	private _searchList = [];
	public showList = [];

	public inputValue = '';

	public activeHistory = false;


	@Output('search') public searchString: EventEmitter<string> = new EventEmitter<string>();

	constructor() {
		this._searchList.push('Ваня', 'Валера', 'Владимир Сергеевич', 'Вася');
	}

	@ViewChild('inputEl', {static: false})
	public inputEl: ElementRef;

	ngOnInit() {
	}

	onFocus(): void {
		this.active = true;
		if (this._searchList.length > 0) {

			if (this.inputValue.length === 0) {
				this.activeHistory = true;
				this.showList = this._searchList.concat();
			}

		}
	}

	onBlur(): void {
		if (this.inputValue.length === 0) {}
	}

	clearInput() {
		this.inputValue = '';
		this.showList.length = 0;
	}

	onKeyUp(event): void {

		if (this.inputValue.length !== 0) {
			this.activeHistory = false;

			this.showList = this._searchList.filter(item => {
				return item.startsWith(this.inputValue);
			})

		} else {
			this.activeHistory = true;

			this.showList = this._searchList.concat();

		}

		// Enter
		if (event.keyCode === 13) {
			this.onSearch();
		}

	}

	removeFromHistory(event, item) {
		event.stopPropagation();
		const index = this._searchList.indexOf(item);
		if (index !== -1) this._searchList.splice(index, 1);

		this.showList = this._searchList.filter(item => {
			return item.startsWith(this.inputValue);
		})

	}

	onSearch() {
		if (this.inputValue.length === 0) return;

		this._searchList.unshift(this.inputValue);
		this._searchList = this._searchList.filter((item, index) => this._searchList.indexOf(item) === index);

		this.searchString.emit(this.inputValue);
		this.clearInput();

	}

	setInputValue(value: string) {
		this.inputValue = value;
		this.activeHistory = false;

		this.showList.length = 0;

	}

	resultStr(item: any) {
		return `${item.slice(this.inputValue.length)}`
	}
}

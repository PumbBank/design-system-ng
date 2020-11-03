import { Component, ElementRef, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output, QueryList, ViewChildren } from '@angular/core';
import { IDataAutocomplete } from 'src/autocomplete/models/data-autocomplete';
import { Observable, Subject, fromEvent } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { KeyEnum } from 'src/autocomplete/key-code';
import { SimplebarAngularComponent } from 'simplebar-angular'


@Component({
  selector: 'autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss']
})
export class AutocompleteComponent implements OnInit, OnDestroy {


  autocompleteOptions: Array<string> = [];
  active: boolean = false;
  private _unsubscriber$ = new Subject();
  private _unsubscriberEvent$ = new Subject();
  optionIndexActive: number = 0;

  numberOfPromices: number = 0;
  numberOfPromicesComplete: number = 0;

  @Input() dataSource: IDataAutocomplete | Array<string>;
  @Input() currentInputValue: Observable<string>;
  @Input() callbackFnSetInputValue: Function;

  @Output() loading: EventEmitter<boolean> = new EventEmitter<boolean>();
  @ViewChildren('options') optionsRefs: QueryList<SimplebarAngularComponent>;

  @HostListener('document:click', ['$event.target'])
  public clickOutside(target: any): void {
    if (!this._elementRef.nativeElement.contains(target) && !this._elementRef.nativeElement.parentElement.contains(target)) {
      this.active = false;
      this.loading.next(false);
    }
  }

  constructor(private _elementRef: ElementRef) { }

  ngOnInit(): void {
    this.currentInputValue
      .pipe(
        takeUntil(this._unsubscriber$),
        debounceTime(300))
      .subscribe((inputText) => {
        if (inputText.length > 0) this.setAutocompliteItems(inputText, this.dataSource);
      });

    fromEvent<KeyboardEvent>(this._elementRef.nativeElement.parentElement, 'keydown')
      .pipe(takeUntil(this._unsubscriberEvent$))
      .subscribe((event: KeyboardEvent) => {

        if (this.active && this.autocompleteOptions.length > 0) {
          switch (event.key) {
            case KeyEnum.keyArrowDown:

              if (this.optionIndexActive < this.autocompleteOptions.length) {
                this.optionIndexActive++;
                this.scrollToOption(this.optionIndexActive - 1);
              }
              else {
                this.optionIndexActive = 1;
                this.scrollToOption(this.optionIndexActive - 1);
              }
              break;
            case KeyEnum.keyArrowUp:
              if (this.optionIndexActive > 1) {
                this.optionIndexActive--;
                this.scrollToOption(this.optionIndexActive - 1);
              }
              else {
                this.optionIndexActive = this.autocompleteOptions.length;
                this.scrollToOption(this.optionIndexActive - 1);
              }
              break;
            case KeyEnum.enter:
              this.optionClick(this.autocompleteOptions[this.optionIndexActive - 1]);
              break;
            default:
              break;
          }
        }
      });
  }

  optionClick(option: string) {
    this.callbackFnSetInputValue(option);
    this.active = false;
    this.loading.next(false);
  }

  private setAutocompliteItems(inputText: string, dataSource: IDataAutocomplete | Array<string>): void {
    this.autocompleteOptions = [];
    this.numberOfPromices++;

    if (Array.isArray(dataSource)) {
      this.autocompleteOptions = dataSource.filter(option => option.toUpperCase().indexOf(inputText.toUpperCase()) + 1).sort();
    } else {
      setTimeout(() => {
        if (this.autocompleteOptions.length === 0 && this.numberOfPromicesComplete === 0) {
          this.loading.next(true);
        }
      }, 300);
      dataSource.getData(inputText)
        .then((val: Array<string>) => {
          this.autocompleteOptions = val.filter(option => option.toUpperCase().indexOf(inputText.toUpperCase()) + 1).sort();
          this.numberOfPromicesComplete++;
        })
        .catch((e) => console.error(e))
        .finally(() => {
          if (this.numberOfPromices === this.numberOfPromicesComplete) {
            this.loading.next(false);
            this.numberOfPromicesComplete = 0;
            this.numberOfPromices = 0;
          }
        });
    }
    this.active = true;
  }

  private scrollToOption(index: number): void {
    this.optionsRefs.first.SimpleBar.getScrollElement()
    const optionListElement = this.optionsRefs.first.SimpleBar.getScrollElement();
    const optionElement = document.getElementsByClassName('autocomplete__option')[index];

    const thisRect: DOMRect = optionListElement.getBoundingClientRect();
    const optionRect: DOMRect = optionElement.getBoundingClientRect();

    optionListElement.scrollTo(0, optionListElement.scrollTop + optionRect.y - thisRect.y);

  }

  ngOnDestroy(): void {
    this._unsubscriber$.next();
    this._unsubscriber$.complete();
    this._unsubscriberEvent$.next();
    this._unsubscriberEvent$.complete();
  }
}

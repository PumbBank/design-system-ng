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
  optionIndexActive: number = 0;

  promiceId: number = 0;
  promiceCompleteId: number = 0;
  getOptionsFromDataSource: any;
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
    this.getOptionsFromDataSource = this.cachedFn();
    this.currentInputValue
      .pipe(
        takeUntil(this._unsubscriber$),
        debounceTime(300))
      .subscribe((inputText) => {
        if (inputText.length > 0) {
          this.setAutocompliteItems(inputText, this.dataSource);
        }
        else {
          this.resetLoadingDataFromService();
        }
      });

    fromEvent<KeyboardEvent>(this._elementRef.nativeElement.parentElement, 'keydown')
      .pipe(takeUntil(this._unsubscriber$))
      .subscribe((event: KeyboardEvent) => {

        switch (event.key) {
          case KeyEnum.esc:
            this.resetLoadingDataFromService();
            break;
          case KeyEnum.tab:
            this.resetLoadingDataFromService();
            break;

          default:
            break;
        }

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

  private async setAutocompliteItems(inputText: string, dataSource: IDataAutocomplete | Array<string>): Promise<void> {

    if (Array.isArray(dataSource)) {
      this.autocompleteOptions = dataSource
        .filter(option => option.toUpperCase().indexOf(inputText.toUpperCase()) === 0)
        .sort();
      this.active = true;
    } else {
      this.autocompleteOptions = (await this.getOptionsFromDataSource(inputText, dataSource));
    }

  }

  private cachedFn(): Function {
    let answers: { answer: Array<string> } | any;
    return async (inputText: string, dataSource: IDataAutocomplete) => {
      const inputTextUpperCase = inputText.toUpperCase();
      if (!answers) {
        answers = {}
      } else if (!!answers[inputTextUpperCase]) {
        this.active = true;
        return answers[inputTextUpperCase];
      }

      const data: Array<string> = (await this.getDataFromService(inputText, dataSource)) as Array<string>;

      if (data.length > 0) return answers[inputTextUpperCase] = data;
      else return [];
    }
  }

  private getDataFromService(inputText: string, dataSource: IDataAutocomplete) {
    const timeoutId = setTimeout(() => {
        this.loading.next(true);
      
    }, 300);
    this.promiceId++;
    return dataSource.getData(inputText)
      .then((val: Array<string>) => {
        this.promiceCompleteId++;
        if (this.promiceId !== 0) this.active = true;
        return val;
      })
      .catch((e) => console.error(e))
      .finally(() => {
        if (this.promiceId === this.promiceCompleteId) {
          clearTimeout(timeoutId);
          this.loading.next(false);
          this.promiceCompleteId = 0;
          this.promiceId = 0;
        }
      });
  }

  private scrollToOption(index: number): void {
    const optionListElement = this.optionsRefs.first.SimpleBar.getScrollElement();
    const optionElement = document.getElementsByClassName('autocomplete__option')[index];

    const thisRect: DOMRect = optionListElement.getBoundingClientRect();
    const optionRect: DOMRect = optionElement.getBoundingClientRect();

    optionListElement.scrollTo(0, optionListElement.scrollTop + optionRect.y - thisRect.y);

  }

  private resetLoadingDataFromService() {
    this.active = false;
    this.loading.next(false);
    this.promiceCompleteId = 0;
    this.promiceId = 0;
    this.autocompleteOptions = [];
  }

  ngOnDestroy(): void {
    this._unsubscriber$.next();
    this._unsubscriber$.complete();
  }
}

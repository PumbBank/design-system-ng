import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  ViewChildren
} from '@angular/core';
import { Observable, Subject, fromEvent } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

import { SimplebarAngularComponent } from 'simplebar-angular';

import { IDataAutocomplete } from '../../models/data-autocomplete';
import { KeyEnum } from '../../key-code';

@Component({
  selector: 'autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss']
})

export class AutocompleteComponent implements OnInit, OnDestroy {
  autocompleteOptions: Array<string> = [];
  active: boolean = false;
  private _unSubscriber$: Subject<any> = new Subject();
  optionIndexActive: number = 0;

  promiseId: number = 0;
  promiseCompleteId: number = 0;
  getOptionsFromDataSource: any;
  @Input() dataSource: IDataAutocomplete | Array<string>;
  @Input() currentInputValue: Observable<string>;
  @Input() callbackFnSetInputValue: (option: string) => void;

  @Output() loading: EventEmitter<boolean> = new EventEmitter<boolean>();
  @ViewChildren('options') optionsRefs: QueryList<SimplebarAngularComponent>;

  @HostListener('document:click', ['$event.target'])
  public clickOutside(target: any): void {
    if (
      !this._elementRef.nativeElement.contains(target)
      && !this._elementRef.nativeElement.parentElement.contains(target)
    ) {
      this.active = false;
      this.loading.next(false);
    }
  }

  constructor(private _elementRef: ElementRef) { }

  ngOnInit(): void {
    this.getOptionsFromDataSource = this.cachedFn();
    this.currentInputValue
      .pipe(
        takeUntil(this._unSubscriber$),
        debounceTime(300))
      .subscribe((inputText) => {
        if (inputText.length > 0) {
          this.setAutocompleteItems(inputText, this.dataSource);
        }
        else {
          this.resetLoadingDataFromService();
        }
      });

    fromEvent<KeyboardEvent>(this._elementRef.nativeElement.parentElement, 'keydown')
      .pipe(takeUntil(this._unSubscriber$))
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

  optionClick(option: string): void {
    this.callbackFnSetInputValue(option);
    this.active = false;
    this.loading.next(false);
  }

  private async setAutocompleteItems(inputText: string, dataSource: IDataAutocomplete | Array<string>): Promise<void> {

    if (Array.isArray(dataSource)) {
      this.autocompleteOptions = dataSource
        .filter(option => option.toUpperCase().indexOf(inputText.toUpperCase()) === 0)
        .sort();
      this.active = true;
    } else {
      this.autocompleteOptions = (await this.getOptionsFromDataSource(inputText, dataSource));
    }
  }

  private cachedFn(): object {
    let answers: { answer: Array<string> } | any;
    return async (inputText: string, dataSource: IDataAutocomplete) => {
      const inputTextUpperCase = inputText.toUpperCase();

      if (!answers) {
        answers = {};
      } else if (!!answers[inputTextUpperCase]) {
        this.active = true;
        return answers[inputTextUpperCase];
      }

      const data: Array<string> = (await this.getDataFromService(inputText, dataSource)) as Array<string>;

      if (data.length > 0) { return answers[inputTextUpperCase] = data; }
      else { return []; }
    };
  }

  private getDataFromService(inputText: string, dataSource: IDataAutocomplete): Promise<string[] | void> {
    const timeoutId = setTimeout(() => {
        this.loading.next(true);
    }, 300);
    this.promiseId++;
    return dataSource.getData(inputText)
      .then((val: Array<string>) => {
        this.promiseCompleteId++;
        if (this.promiseId !== 0) { this.active = true; }
        return val;
      })
      .catch((e) => console.error(e))
      .finally(() => {
        if (this.promiseId === this.promiseCompleteId) {
          clearTimeout(timeoutId);
          this.loading.next(false);
          this.promiseCompleteId = 0;
          this.promiseId = 0;
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

  private resetLoadingDataFromService(): void {
    this.active = false;
    this.loading.next(false);
    this.promiseCompleteId = 0;
    this.promiseId = 0;
    this.autocompleteOptions = [];
  }

  ngOnDestroy(): void {
    this._unSubscriber$.next();
    this._unSubscriber$.complete();
  }
}

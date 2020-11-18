import { CODE_TAB, CODE_ARROW_UP, CODE_ARROW_DOWN, CODE_ENTER } from '../../key-code';
import { MillSelectOption } from '../../select-option';
import { AbstractSelectSearch } from './abstract-select-search';
import { ViewChild, ViewChildren, ElementRef, QueryList, ContentChild, Input } from '@angular/core';
import { HintComponent } from '../../../hint/components/hint/hint.component';
import { SimplebarAngularComponent } from 'simplebar-angular'

export abstract class AbstractSelectUserCommunication<K = any, P = any> extends AbstractSelectSearch<K, P> {
  focusedOptionIndex: number = -1;

  searchInputFocused: boolean = false;
  bodyMouseOvered: boolean = false;
  parentOffsetWidth: number;

  @ViewChildren('optionElement') optionsRefs: QueryList<ElementRef>;
  @ViewChildren('selectBodyElement') bodyRef: QueryList<SimplebarAngularComponent>;
  @ViewChild('searchInput', {static: false}) searchInputRef: ElementRef;
  @ContentChild(HintComponent, {static: false}) hintComponent: HintComponent;
  
  @Input() disableSearch: boolean = false;

  optionClick(option: MillSelectOption<K, P>): void {
    if (this.multiple && !this.disableSearch) {
      this.searchInputRef.nativeElement.focus();
    }

    this.selectOption(option);
  }

  ontionChipCloseClick(option: MillSelectOption<K, P>): void {
    this.unselectOption(option);
  }

  onSearchInput(query: string): void {
    super.onSearchInput(query);
    if (!this.active$) {
      this.open();
    }
  }

  onChevronClick(e: Event): void {
    e.stopPropagation();
    if (!this.active$.value) {
      this.onSearchInputFocus();
    } else {
      super.close();
    }
  }

  onSelectSearchClick(): void {
    if (this.disableSearch) this.onSearchInputFocus();
  }

  onSearchInputFocus(): void {
    super.onSearchInputFocus();
    this.searchInputFocused = true;
  }

  open(updateOptionList: boolean = false): void {
    super.open(updateOptionList);
    this.focusedOptionIndex = -1;
  }

  onSearchInputBlur(): void {
    super.onSearchInputBlur();
    this.searchInputFocused = false;

    if (this.single) {
      if (this.selected) {
        this.searchInputValue = (this.selectedOption as any).value;
      } else {
        this.searchInputValue = '';
      }
    }

    this.updateState();
  }

  onSearchInputKeydown(event: KeyboardEvent): void {

    if (event.code === CODE_ARROW_UP && this.active$.value) {
      event.preventDefault();
      event.stopPropagation();

      this.focusedOptionIndex--;

      if (this.focusedOptionIndex < 0) {
        this.focusedOptionIndex = this.options$.value.length - 1;
      }

      this.scrollToOption(this.focusedOptionIndex);

      return;
    }

    if (event.code === CODE_ARROW_DOWN && this.active$.value) {
      event.preventDefault();
      event.stopPropagation();

      this.focusedOptionIndex++;

      if (this.focusedOptionIndex >= this.options$.value.length) {
        this.focusedOptionIndex = 0;
      }

      this.scrollToOption(this.focusedOptionIndex);

      return;
    }

    if (event.code === CODE_ENTER && this.options$.value[this.focusedOptionIndex] && this.active$.value) {
      event.preventDefault();
      event.stopPropagation();

      this.selectOption(this.options$.value[this.focusedOptionIndex]);
    }

    if (event.code === CODE_TAB && this.active$.value) {
      if (this.single && this.options$.value[this.focusedOptionIndex]) {
        this.selectOption(this.options$.value[this.focusedOptionIndex]);
      } else {
        this.close();
      }

      return;
    }
  }

  onBodyMouseOver(): void {
    this.bodyMouseOvered = true;
  }

  onBodyMouseOut(): void {
    this.bodyMouseOvered = false;
    this.updateState();
  }

  protected async selectOption(option: MillSelectOption<K, P>): Promise<void> {
    await super.selectOption(option);

    if (this.single) {
      this.searchInputValue = option.value;
      this.close();
    } else {
      this.searchInputValue = '';
    }

    return Promise.resolve();
  }

  protected updateState(): void {
    if (!this.searchInputFocused && !this.bodyMouseOvered) {
      this.close();
    }
  }

  private scrollToOption(index: number): void {
    const optionListElement = this.bodyRef.first.SimpleBar.getScrollElement();;
    const optionElement = this.optionsRefs.toArray()[index].nativeElement;

    const thisRect: DOMRect = optionListElement.getBoundingClientRect();
    const optionRect: DOMRect = optionElement.getBoundingClientRect();

    optionListElement.scrollTo(0, optionListElement.scrollTop + optionRect.y - thisRect.y);
  }
}

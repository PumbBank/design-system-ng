
import { KEY_CODE_TAB, KEY_CODE_ARROW_UP, KEY_CODE_ARROW_DOWN, KEY_CODE_ENTER } from './../../../utils/key-code';
import { MillSelectOption } from './../../mill-select-option';
import { DEBUG, debugLog } from '../../../utils/degug-log';
import { AbstractSelectSearch } from './abstract-select-search';
import { ViewChild, ViewChildren, ElementRef, QueryList } from '@angular/core';

export abstract class AbstractSelectUserCommunication<K = any, P = any> extends AbstractSelectSearch<K, P> {
  focusedOptionIndex: number = -1;

  searchInputFocused = false;
  bodyMouseOvered = false;

  @ViewChildren('optionElement') optionsRefs: QueryList<ElementRef>;
  @ViewChild('selectBodyElement') bodyRef: ElementRef;

  onSearchInputFocus() {
    if (DEBUG) { debugLog(`[AbstractSelectUserCommunication] onSearchInputFocus`); }

    super.onSearchInputFocus();

    this.searchInputFocused = true;
  }

  open() {
    super.open();
    this.focusedOptionIndex = -1;
  }

  onSearchInputBlur() {
    if (DEBUG) { debugLog(`[AbstractSelectUserCommunication] onSearchInputBlur`); }

    super.onSearchInputBlur();

    this.searchInputFocused = false;

    if (this.single) {
      if (this.selected) {
        this.searchInputValue = (this.selectedOption as any).value;
      } else {
        this.searchInputValue = '';
      }

      this.updateState();
    }
  }

  onSearchInputKeydown(event: KeyboardEvent) {
    // tslint:disable-next-line:max-line-length
    if (DEBUG) { debugLog(`[AbstractSelectUserCommunication] onSearchInputKeydown ${JSON.stringify({ code: event.keyCode, chanr: event.char })}`); }


    if (event.keyCode === KEY_CODE_ARROW_UP) {
      event.preventDefault();
      event.stopPropagation();

      this.focusedOptionIndex--;

      if (this.focusedOptionIndex < 0) {
        this.focusedOptionIndex = this.options$.value.length - 1;
      }

      this.scrollToOption(this.focusedOptionIndex);

      return;
    }

    if (event.keyCode === KEY_CODE_ARROW_DOWN) {
      event.preventDefault();
      event.stopPropagation();

      this.focusedOptionIndex++;

      if (this.focusedOptionIndex >= this.options$.value.length) {
        this.focusedOptionIndex = 0;
      }

      this.scrollToOption(this.focusedOptionIndex);

      return;
    }

    if (event.keyCode === KEY_CODE_ENTER && this.options$.value[this.focusedOptionIndex]) {
      event.preventDefault();
      event.stopPropagation();

      this.selectOption(this.options$.value[this.focusedOptionIndex]);
    }

    if (event.keyCode === KEY_CODE_TAB) {
      if (this.single && this.options$.value[this.focusedOptionIndex]) {
        this.selectOption(this.options$.value[this.focusedOptionIndex]);
      } else {
        this.close();
      }

      return;
    }
  }

  onBodyMouseOver() {
    if (DEBUG) { debugLog(`[AbstractSelectUserCommunication] onBodyMouseOver`); }

    this.bodyMouseOvered = true;
  }

  onBodyMouseOut() {
    if (DEBUG) { debugLog(`[AbstractSelectUserCommunication] onBodyMouseOut`); }

    this.bodyMouseOvered = false;
  }

  protected async selectOption(option: MillSelectOption<K, P>): Promise<void> {
    if (DEBUG) { debugLog(`[onSearchInputKeydown] selectOption`); }

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
    // tslint:disable-next-line:max-line-length
    if (DEBUG) { debugLog(`[AbstractSelectUserCommunication] updateState > searchInputFocused: ${this.searchInputFocused} bodyMouseOvered: ${this.bodyMouseOvered}`); }
    if (!this.searchInputFocused && !this.bodyMouseOvered) {
      this.close();
    }
  }

  private scrollToOption(index: number) {
    const optionListElement = this.bodyRef.nativeElement;
    const optionElement = this.optionsRefs.toArray()[index].nativeElement;

    const thisRect: DOMRect = optionListElement.getBoundingClientRect();
    const optionRect: DOMRect = optionElement.getBoundingClientRect();

    optionListElement.scrollTo(0, optionListElement.scrollTop + optionRect.y - thisRect.y);
  }
}

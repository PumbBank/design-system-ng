import { AbstractSelectState } from './abstract-select-state';

export abstract class AbstractSelectSearch<K = any, P = any> extends AbstractSelectState<K, P> {

  onSearchInput(query: string): void {

    if (query.length === 0) {
      this.clearSelected();
    }

    this.searchInputValue = query;
    this.loadOptionsFromSource(query);
    this.selectedChange.emit(this.selected);
  }

  onSearchInputFocus(): void {
    this.open(true);
  }

  onSearchInputBlur(): void {
  }
}

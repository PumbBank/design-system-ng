import { AbstractSelectState } from './abstract-select-state';

export abstract class AbstractSelectSearch<K = any, P = any> extends AbstractSelectState<K, P> {

  onSearchInput(query: string): void {

    if (this.single) {
      this.clearSelected();
    }

    this.searchInputValue = query;
    this.loadOptionsFromSource(query);
  }

  onSearchInputFocus(): void {
    this.open(true);
  }

  onSearchInputBlur(): void {
  }
}

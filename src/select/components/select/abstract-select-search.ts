import { AbstractSelectState } from './abstract-select-state';

export abstract class AbstractSelectSearch<K = any, P = any> extends AbstractSelectState<K, P> {

  onSearchInput(query: string) {

    if (this.single) {
      this.clearSelected();
    }

    this.searchInputValue = query;
    this.loadOptionsFromSource(query);
  }

  onSearchInputFocus() {
    this.open(true);
  }

  onSearchInputBlur() {
  }
}

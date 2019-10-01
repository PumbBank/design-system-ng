import { AbstractSelectState } from './abstract-select-state';
import { DEBUG, debugLog } from '../../../utils/degug-log';

export abstract class AbstractSelectSearch<K = any, P = any> extends AbstractSelectState<K, P> {
  searchInputValue = '';

  onSearchInput(query: string) {
    if (DEBUG) { debugLog(`[AbstractSelectSearch] onSearchInput "${query}"`); }

    if (this.single) {
      this.clearSelected();
    }
    this.searchInputValue = query;
    this.updateOptions(query);
  }

  onSearchInputFocus() {
    if (DEBUG) { debugLog(`[AbstractSelectSearch] onSearchInputFocus`); }
    this.open();
  }

  onSearchInputBlur() {
    if (DEBUG) { debugLog(`[AbstractSelectSearch] onSearchInputBlur`); }
  }
}

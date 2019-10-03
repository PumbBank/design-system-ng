import { AbstractSelectState } from './abstract-select-state';
import { DEBUG, debugLog } from '../../../utils/degug-log';

export abstract class AbstractSelectSearch<K = any, P = any> extends AbstractSelectState<K, P> {

  onSearchInput(query: string) {
    if (DEBUG) { debugLog(`[AbstractSelectSearch] onSearchInput "${query}"`); }

    if (this.single) {
      this.clearSelected();
    }

    this.searchInputValue = query;
    this.loadOptionsFromSource(query);
  }

  onSearchInputFocus() {
    if (DEBUG) { debugLog(`[AbstractSelectSearch] onSearchInputFocus`); }
    this.open(true);
  }

  onSearchInputBlur() {
    if (DEBUG) { debugLog(`[AbstractSelectSearch] onSearchInputBlur`); }
  }
}

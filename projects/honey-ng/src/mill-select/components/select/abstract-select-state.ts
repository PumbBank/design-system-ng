import { BehaviorSubject } from 'rxjs';
import { AbstractSelectOptions } from './abstract-select-option';
import { DEBUG, debugLog } from '../../../utils/degug-log';


export abstract class AbstractSelectState<K = any, P = any> extends AbstractSelectOptions<K, P> {
  active$ = new BehaviorSubject<boolean>(false);
  toggle(): boolean {
    if (DEBUG) { debugLog(`[AbstractSelectState] toggle ${this.active$.value}`); }

    if (this.active$.value) {
      this.close();
    } else {
      this.open();
    }

    return this.active$.value;
  }

  open(): void {
    if (DEBUG) { debugLog(`[AbstractSelectState] open`); }

    this.updateOptions('');
    this.active$.next(true);
  }

  close(): void {
    if (DEBUG) { debugLog(`[AbstractSelectState] close`); }

    this.active$.next(false);
  }
}

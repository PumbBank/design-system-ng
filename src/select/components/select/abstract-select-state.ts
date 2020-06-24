import { BehaviorSubject } from 'rxjs';
import { AbstractSelectOptions } from './abstract-select-option';

export enum InactiveBodyMode {
  NOT_VISIBLE,
  NOT_RENDER
}

export abstract class AbstractSelectState<K = any, P = any> extends AbstractSelectOptions<K, P> {
  active$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  inactiveBodyMode: InactiveBodyMode = InactiveBodyMode.NOT_RENDER;

  get isNotVisibleInactiveBodyMode(): boolean {
    return this.inactiveBodyMode === InactiveBodyMode.NOT_VISIBLE;
  }

  get isNotRenderInactiveBodyMode(): boolean {
    return this.inactiveBodyMode === InactiveBodyMode.NOT_RENDER;
  }

  // toggle(): boolean {
  //   if (DEBUG) { debugLog(`[AbstractSelectState] toggle "${this.active$.value}"`); }

  //   if (this.active$.value) {
  //     this.close();
  //   } else {
  //     this.open();
  //   }

  //   return this.active$.value;
  // }

  open(updateOptionList: boolean = false): void {

    if (updateOptionList) {
      this.loadOptionsFromSource('');
    }

    this.active$.next(true);
  }

  close(): void {
    this.active$.next(false);
  }
}

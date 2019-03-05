import { InjectionToken, ViewContainerRef, Injector } from '@angular/core';
import { Observable } from 'rxjs';

export const DIALOG_CONTROLLER = new InjectionToken<DialogConroller>('DIALOG_CONTROLLER');

export interface DialogConroller {
  emitBackdropClick: Function,
  close: Function;
  onClose: Observable<void>;
}

export interface OpenDialogParams {
  injectorSource?: ViewContainerRef | Injector
}

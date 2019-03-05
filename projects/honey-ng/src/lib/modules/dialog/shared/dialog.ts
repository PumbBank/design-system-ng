import { InjectionToken, ViewContainerRef, Injector } from '@angular/core';

export const DIALOG_CONTROLLER = new InjectionToken<DialogConroller>('DIALOG_CONTROLLER');

export interface DialogConroller {
  emitBackdropClick: Function,
  close: Function;
}

export interface OpenDialogParams {
  injectorSource?: ViewContainerRef | Injector
}

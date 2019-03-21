import { InjectionToken, ViewContainerRef, Injector, ComponentRef } from '@angular/core';
import { Observable, Subject } from 'rxjs';

export const DIALOG_CONTROLLER = new InjectionToken<DialogConroller>('DIALOG_CONTROLLER');
export const DIALOG_DATA = new InjectionToken<any>('DIALOG_DATA');
export const DIALOG_SERVICE_CONTROLLER = new InjectionToken<DialogServiceController>('DIALOG_SERVICE_CONTROLLER');

export interface DialogConroller {
  close: Function;
  onClose: Observable<void>;
}

export interface OpenDialogParams {
  injectorSource?: ViewContainerRef | Injector;
  data?: any;
}

export class DialogRef {
  componentRef: ComponentRef<any>;
  onClose: Subject<any> = new Subject<any>();

  constructor(public params: OpenDialogParams) { }

  close(...args: any[]): void {
    this.componentRef.destroy();
    this.onClose.next(args.length === 1 ? args[0] : args);
    this.onClose.complete();
  }
}


export class DialogServiceController {
  emitBackdropClick: Function;
}

import { InjectionToken } from '@angular/core';

export const DIALOG_CONTROLLER = new InjectionToken<IDialogConroller>('DIALOG_CONTROLLER');

export interface IDialogConroller {
  emitBackdropClick: Function
}

export interface IOpenDialogParams {

}

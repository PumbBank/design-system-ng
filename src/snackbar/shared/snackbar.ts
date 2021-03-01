import { InjectionToken } from "@angular/core";
import { Subject } from 'rxjs';

export const SNACK_BAR_DATA: InjectionToken<any> = new InjectionToken<any>('SNACK_BAR_DATA');
export const SNACK_BAR_CONTROLLER: InjectionToken<any> = new InjectionToken<any>('SNACK_BAR_CONTROLLER');

export class SnackbarRef {
	onClose: Subject<any> = new Subject<any>();

	close(): void {
		this.onClose.next();
		this.onClose.complete();
	}
}
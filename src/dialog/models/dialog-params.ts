import { Injector, ViewContainerRef } from "@angular/core";
import { Observable } from 'rxjs';

export interface DialogConroller {
	close: Function;
	onClose: Observable<any>;
}

export interface OpenDialogParams {
	injectorSource?: ViewContainerRef | Injector;
	data?: any;
}

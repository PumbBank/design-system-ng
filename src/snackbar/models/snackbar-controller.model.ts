import { Observable } from 'rxjs';

export interface ISnackbarConroller {
	close: Function;
	onClose: Observable<void>;
}
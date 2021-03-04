import { Observable } from 'rxjs';

export interface ISnackbarController {
	close: Function;
	onClose: Observable<void>;
}

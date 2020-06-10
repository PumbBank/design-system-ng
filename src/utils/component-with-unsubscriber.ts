import { OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

export class ComponentWithUnsubscriber implements OnDestroy {
  unsubscriber$: Subject<void> = new Subject();

  ngOnDestroy(): void {
    this.unsubscriber$.next();
    this.unsubscriber$.complete();
  }
}

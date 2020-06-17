import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class SidebarController {
  collapsed$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  collapsedToggle(): boolean {
    this.collapsed$.next(!this.collapsed$.value) ;
    return this.collapsed$.value;
  }
}

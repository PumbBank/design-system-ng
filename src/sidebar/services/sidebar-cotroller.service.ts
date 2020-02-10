import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class SidebarController {
  collapsed$ = new BehaviorSubject<boolean>(true);

  collapsedToggle(): boolean {
    this.collapsed$.next(!this.collapsed$.value) ;
    return this.collapsed$.value;
  }
}
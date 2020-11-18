import { Injectable } from '@angular/core';
import { DataTableRowComponent } from '../components/data-table-row/data-table-row.component';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SelectService {
  public selectedIndex: BehaviorSubject<number> = new BehaviorSubject<number>(null);

  get selected(): Observable<number> {
    return this.selectedIndex.asObservable();
  }

  constructor() {}

  select(row: DataTableRowComponent): void {
    this.selectedIndex.next(row.index);
  }


}

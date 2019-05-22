import { InjectionToken } from '@angular/core';

export type SortDirection = 'ASC' | 'DESC';
export const iterations: SortDirection[] = ['ASC', 'DESC', null];

export const SORT_CONTROLLER = new InjectionToken<any>('SORT_CONTROLLER');

export interface SortController {

  nextSortIteration(sortField: string): void;

  checkField(fieldName: string): string;
}

export interface SortEvent {
  sortField: string | null;
  sortDirection: SortDirection;
}

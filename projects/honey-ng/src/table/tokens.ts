import { InjectionToken } from '@angular/core';
import { TableDirective } from './directives/table/table.directive';

export const HN_TABLE = new InjectionToken<TableDirective>('HN_TABLE');

import { Observable } from 'rxjs';

export function FilteringData(
  service: DataService<any>,
  makeFilter: (param: string) => any,
  makeData: (data: ApiResult<any>) => IKeyValue[]
): IKeyValue {

  return null;
}

export interface DataService<T> {
  get(filter: any): Observable<ApiResult<T>>;
}

export interface ApiResult<T = any> {
  items: T[];
  total_count: number;
}

export interface IKeyValue {
  [key: string]: string;
}

export interface IDataSource<T> {
  search(value: string): IOption<T>[];
  get(key: T): IOption<T>;
}

export interface IOption<T> {
  key: T;
  value: string;
}

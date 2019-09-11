export interface IDataSource<T> {
  search(value: string): Promise<IOption<T>[]>;
  get(key: T): Promise<IOption<T | null>>;
}

export interface IOption<T> {
  key: T;
  value: string;
  payload?: any;
}

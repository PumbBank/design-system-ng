export interface IDataAutocomplete {
  getData(inputValue: string): Promise<Array<string>>;
}
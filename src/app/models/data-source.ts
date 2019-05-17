import { IDataSource, IOption } from 'projects/honey-ng/src/public_api';

export class DataSource implements IDataSource<string> {
  private data: string[];

  constructor(private inputData: string[]) {
    this.data = inputData;
  }

  search(value: string): IOption<string>[] {
    if (value) {
      const filteredData = this.data.filter((merch: string) => merch.indexOf(value) !== -1)
        .map((m: string) => ({ key: m, value: m }));
      return filteredData;
    }
    return this.data.map((m: string) => ({ key: 'k_' + m, value: m }));
  }

  get(key: string): IOption<string> {
    throw new Error('Method not implemented.');
  }
}

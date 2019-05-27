import { IDataSource, IOption } from 'projects/honey-ng/src/public_api';

export class DataSource implements IDataSource<string> {
  private data: string[];

  constructor(private inputData: string[]) {
    this.data = inputData;
  }

  search(value: string): Promise<IOption<string>[]> {
    if (value) {
      const filteredData = this.data.filter((merch: string) => merch.indexOf(value) !== -1)
        .map((m: string) => ({ key: m, value: m }));
      return Promise.resolve(filteredData);
    } else {
      return Promise.resolve(this.data.map((m: string) => ({ key: m, value: m })));
    }
  }

  get(key: string): Promise<IOption<string>> {
    return new Promise((rs, rj) => {
      setTimeout(() => {

        if (key) {
          const filteredData = this.data.find((f: string) => f === key);
          rs({ key: key, value: filteredData });
        }
        rs(null);
      }, 300);
    });
  }
}


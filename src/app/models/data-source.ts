import { IDataSource, IOption } from 'projects/honey-ng/src/public_api';

export class DataSource implements IDataSource<string> {
  private data: string[];

  constructor(private inputData: string[]) {
    this.data = inputData;
  }

  search(value: string): Promise<IOption<string>[]> {

   return new Promise((resolve: Function, reject: Function) => {
    if (value) {
    const filteredData = this.data.filter((merch: string) => merch.indexOf(value) !== -1)
    .map((m: string) => ({ key: m, value: m }));
    resolve(filteredData);
    } else {
      resolve(this.data.map((m: string) => ({ key: 'k_' + m, value: m })));
    }
   });
  }

  get(key: string): Promise<IOption<string>> {

    return new Promise((resolve: Function, reject: Function) => {
      if (key) {
      const filteredData = this.data.find((f: string) => f === key);
      resolve({ key: 'k_' + key, value: filteredData });
      }
     });
  }
}


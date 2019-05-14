import { Injectable } from '@angular/core';

@Injectable()
export class AppService {

  private filterValue: string;

  get FilterValue() {
    return this.filterValue;
  }

  set FilterValue(value: string) {
    this.filterValue = value;
  }
}

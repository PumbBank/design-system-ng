import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class SettlementService {
  constructor(
    private http:  HttpClient
  ) { }

  get(q: string): Promise<any> {
    return this.http.get(`/api/settlements/Regions?${q}`).toPromise();
  }
}

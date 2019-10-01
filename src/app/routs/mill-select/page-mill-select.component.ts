import { MillOptionSource, SimpleOptionSource } from 'projects/honey-ng/src/public_api';
import { Component, OnInit } from '@angular/core';
import { SettlementService } from 'src/app/services/settlement.service';
import { Subject } from 'rxjs';
import { __core_private_testing_placeholder__ } from '@angular/core/testing';

@Component({
  selector: 'page-mill-select',
  templateUrl: './page-mill-select.component.html'
})
export class PageMillSelectComponent implements OnInit {

  range = Array(100).fill(0);

  simpleOS: MillOptionSource<number> = new SimpleOptionSource([
    {
      key: 1,
      value: 'Банан'
    },
    {
      key: 2,
      value: 'Клубника'
    }
  ]);

  settlementOs: MillOptionSource<string>;

  constructor(private settlementService: SettlementService) {

  }

  onTypeChange(nextValue: any): void {
    console.log(nextValue);
  }

  ngOnInit(): void {
    const _this = this;
    this.settlementOs = {
      onChanges$: new Subject(),
      inited: () => Promise.resolve(),
      search: (q: string) =>
        _this.settlementService.get(q ? `regionName=${q}` : '')
          .then(
            (settlements: any) =>
              settlements.result.
                map((settlement: any) => ({
                  key: settlement.Id,
                  value: settlement.Region
                }))
          )
      ,
      get: (key: string) => _this.settlementService.get(`?regionName=key`)
        .then(
          (settlements: any) =>
            settlements.result
              .map((settlement: any) => ({
                key: settlement.Id,
                value: settlement.Region
              }))
              .find((option: any) => option.key === key)
        )
    };
  }

}

import { Component, Input } from '@angular/core';

@Component({
  selector: 'table-overview',
  templateUrl: './table-overview.component.html',
  styleUrls: ['./table-overview.component.scss']
})
export class TableOverview {
  @Input() public data;
  @Input() public dataBig;
  @Input() public dataModel;
  @Input() public dataModelWithSort;
  @Input() public dataModelWithFilter;
  @Input() public dataModelWithSortAndFilter;

  public showSelected;
  public showOutput;

  public onSelectRow(event): void {
    this.showSelected = JSON.stringify(event);
  }

  public onTableOutput(event): void {
    this.showOutput = JSON.stringify(event);
  }
}

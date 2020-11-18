import { Component, HostBinding, OnInit } from '@angular/core';
import { SelectService } from '../../services/select.service';

@Component({
  selector: 'mill-row',
  templateUrl: './data-table-row.component.html',
  styleUrls: ['./data-table-row.component.scss'],
})
export class DataTableRowComponent implements OnInit {

  static rowIndex: number = 0;
  public index: number;

  @HostBinding('class.table-row') public get class(): boolean {
    return true;
  }
  // @HostBinding('class.table-row_active') get selected() {
  //   return this.selectService.selectedIndex.getValue() === this.index;
  // }
  //
  // @HostListener('click') onClick() {
  //   this.selectService.select(this);
  // }


  constructor(private selectService: SelectService) {
    this.index = DataTableRowComponent.rowIndex++;
  }

  ngOnInit(): void {

  }

}

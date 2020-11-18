import { Component, HostBinding, OnInit } from '@angular/core';

@Component({
  selector: 'mill-header-row',
  templateUrl: './data-table-header.component.html',
  styleUrls: ['./data-table-header.component.scss']
})
export class DataTableHeaderComponent implements OnInit {

  @HostBinding('class.table-header-row') public get class(): boolean {
    return true;
  }

  constructor() { }

  ngOnInit(): void {
  }

}

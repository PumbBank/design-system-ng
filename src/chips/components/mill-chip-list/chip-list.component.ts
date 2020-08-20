import { Component, HostBinding, OnInit } from '@angular/core';

@Component({
  selector: 'mill-chip-list',
  templateUrl: './chip-list.component.html',
  styleUrls: ['./chip-list.component.scss']
})
export class ChipListComponent implements OnInit {

  @HostBinding('class') public hostClass: string = 'mill-chip-list';

  constructor() {
  }

  ngOnInit(): void {
  }

}

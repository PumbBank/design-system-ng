import { Component, Inject, Input, OnInit } from '@angular/core';
import { SelectService } from '../../services/select.service';
import { MillRowDirective, MillRowToken } from '../../directives/rows';


@Component({
  selector: 'mill-select-input',
  templateUrl: './select-input.component.html',
  styleUrls: ['./select-input.component.scss']
})
export class SelectInputComponent implements OnInit {
  static selectIndex: number = 0;


  @Input() public type: 'radio' | 'checkbox';
  public index: number;

  public selected: boolean;

  constructor(
    @Inject(MillRowToken) row: MillRowDirective,
    private selectService: SelectService,
  ) {

  }

  ngOnInit(): void {
    this.selectService.selectedIndex.subscribe(idx => this.selected = idx === this.index);
  }

}

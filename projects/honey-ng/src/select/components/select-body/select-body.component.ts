import { Component, OnInit } from '@angular/core';
import { SelectComponent } from '../select/select.component';

@Component({
  selector: 'hn-select-body',
  templateUrl: './select-body.component.html',
  styleUrls: ['./select-body.component.scss']
})
export class SelectBodyComponent implements OnInit {

  get active(): boolean {
    console.log(this.selectComponent.active);
    return this.selectComponent.active;
  }

  constructor(
    private selectComponent: SelectComponent
  ) { }

  ngOnInit() {
  }

}

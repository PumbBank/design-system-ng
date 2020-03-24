import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'tabs-overview',
  templateUrl: './tabs-page.component.html',
  styleUrls: ['./tabs-page.component.scss']
})
export class TabsOverview implements OnInit {

  @Input() public disable: boolean;
  @Input() public fullWidth: boolean;

  constructor() { }

  ngOnInit() {
  }

}

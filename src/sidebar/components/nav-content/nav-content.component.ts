import { Component, OnInit, AfterContentInit, ContentChild } from '@angular/core';
import { NavContentHeadComponent } from '../nav-content-head/nav-content-head.component';

@Component({
  selector: 'nav-content',
  templateUrl: './nav-content.component.html',
  styleUrls: ['./nav-content.component.scss']
})
export class NavContentComponent implements AfterContentInit {

  @ContentChild(NavContentHeadComponent) contentHead: NavContentHeadComponent;

  isContentHead: boolean;

  ngAfterContentInit(): void {
    if (!!this.contentHead) this.isContentHead = true;
  }

}

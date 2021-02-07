import { Component, Input, OnInit } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-sidebar-overview',
  templateUrl: './sidebar-page.component.html',
  styleUrls: ['./sidebar-page.component.scss', '../../assets/styles/overview.scss']
})
export class SitebarOverviewComponent {

  username: string = `ФОП Константинопольский Константин Константинович`;
  additional: string = 'Information text asd ad ad sad a da';
  avatar: string = 'https://interactive-examples.mdn.mozilla.net/media/examples/grapefruit-slice-332-332.jpg';

}

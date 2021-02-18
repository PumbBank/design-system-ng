import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar-overview',
  templateUrl: './sidebar-page.component.html',
  styleUrls: ['./sidebar-page.component.scss', '../../assets/styles/overview.scss']
})
export class SitebarOverviewComponent {

  username: string = `ФОП Константинопольский Константин Константинович`;
  additional: string = 'Information text asd ad ad sad a da';
  avatar: string = 'https://developer.mozilla.org/static/img/favicon144.png';

}

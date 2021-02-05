import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'nav-content-head',
  templateUrl: './nav-content-head.component.html',
  styleUrls: ['./nav-content-head.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavContentHeadComponent {
}

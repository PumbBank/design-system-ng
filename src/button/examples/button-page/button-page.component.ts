import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button-overview',
  templateUrl: './button-page.component.html',
  styleUrls: ['./button-page.component.scss']
})
export class ButtonOverview {
  @Input() label;
  icon = 'home';

  types = ['filled', 'ghost', 'hidden']
}
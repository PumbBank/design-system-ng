import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-checkbox-overview',
  templateUrl: './checkbox-page.component.html',
  styleUrls: ['./checkbox-page.component.scss']
})
export class CheckboxOverviewComponent {

  @Input() label: string

}

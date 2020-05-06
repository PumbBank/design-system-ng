import { Component, Input } from '@angular/core';

interface ListInterface {
  value: any;
  isHistory: boolean;
}

@Component({
  selector: 'search-input-overview',
  templateUrl: './search-input-overview.component.html',
  styleUrls: ['./search-input-overview.component.scss', '../../../assets/styles/overview.scss']
})
export class SearchInputOverviewComponent {
  @Input() list: ListInterface;
  @Input() disabled: boolean;
  @Input() width: number;
}

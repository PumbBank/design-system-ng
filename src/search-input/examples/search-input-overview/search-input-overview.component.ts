import { Component, Input } from '@angular/core';
import { ListInterface } from '../../components/search-input/search-input.component';

@Component({
  selector: 'search-input-overview-example',
  templateUrl: './search-input-overview.component.html',
  styleUrls: ['./search-input-overview.component.scss']
})

export class SearchInputOverviewComponent {
  @Input() list: ListInterface;
  @Input() disabled: boolean;
  @Input() width: number;
}

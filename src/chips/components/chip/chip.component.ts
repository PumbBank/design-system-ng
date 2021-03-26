import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core';
import { ChipState, ChipView } from '../../models/chip-parameters.model';

@Component({
  selector: 'mill-chip',
  templateUrl: 'chip.component.html',
  styleUrls: ['./chip.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChipComponent implements OnChanges {
  applyIcon: boolean

  @HostBinding('class') public hostClass: string = 'mill-chip';

  @Input() disabled: boolean = false;
  @Input() view: ChipView = ChipView.outlined;
  @Input() state: ChipState = ChipState.Basic;
  @Input() icon: string;

  @Output() removed: EventEmitter<any> = new EventEmitter<any>();
  @Output() action: EventEmitter<any> = new EventEmitter<any>();

  @HostListener('click', ['$event']) _click(event: MouseEvent): void {
    event.stopPropagation();
    event.preventDefault();
    this.click();
  }

  constructor() {
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes?.icon?.currentValue) {
      this.applyIcon = true;
    }
    if (changes?.view?.currentValue === ChipView.filled && this.state === ChipState.ActiveSecondary) {
      this.applyIcon = false;
    }
  }

  click(): void {
    if (!this.disabled) {
      this.action.emit({chip: this});
    }
  }

  public remove(): void {
    this.removed.emit({chip: this});
  }
}

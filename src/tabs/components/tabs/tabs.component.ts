import {
  AfterViewInit,
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  HostBinding,
  Input,
  ViewEncapsulation
} from '@angular/core';
import { TabsBase } from '../../tabs';

@Component({
  selector: 'mill-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [{provide: TabsBase, useExisting: TabsComponent}],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TabsComponent extends TabsBase implements AfterViewInit {

  @Input()
  public set selected(value: string) {
    if (value) {
      this.selectedTabId = value;
    }
  }

  @HostBinding('class.mill-tabs') public cssMillTabs: boolean = true;

  constructor(private _cdr: ChangeDetectorRef) {
    super();
  }

  ngAfterViewInit(): void {
    super.ngAfterViewInit();
    this._cdr.markForCheck();
  }

  public barStyles(): { left: string, width: string } {
    if (this.selectedLabel) {
      return {left: this.selectedLabel.offsetLeft + 'px', width: this.selectedLabel.offsetWidth + 'px'};
    }

    return {left: '0px', width: '0px'};
  }

}



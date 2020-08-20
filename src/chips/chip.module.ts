import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconsModule } from '../icons';
import { ChipListComponent } from './components/mill-chip-list/chip-list.component';
import { ChipClearComponent } from './components/mill-chip-clear/chip-clear.component';
import { ChipRemoveDirective } from './directives/chip-remove.directive';
import { ChipComponent } from './components/chip/chip.component';
import { ChipOverviewComponent } from './examples/chip-page.component';

@NgModule({
  declarations: [
    ChipComponent,
    ChipOverviewComponent,
    ChipListComponent,
    ChipClearComponent,
    ChipRemoveDirective
  ],
  exports: [
    ChipComponent,
    ChipOverviewComponent,
    ChipListComponent,
    ChipClearComponent,
    ChipRemoveDirective
  ],
  imports: [
    CommonModule,
    IconsModule
  ]
})
export class ChipModule {
}

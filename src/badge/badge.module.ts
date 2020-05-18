import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BadgeComponent } from './components/badge/badge.component';
import { BadgeIconService } from './services/badge-icon.service';
import { BadgeIconDirective } from './directives/badge-icon.directive';
import { IconsModule } from '../2-icons/icons.module';

@NgModule({
  declarations: [
    BadgeComponent,
    BadgeIconDirective
  ],
  exports: [
    BadgeComponent,
    BadgeIconDirective
  ],
  imports: [
    CommonModule,
    IconsModule
  ],
  providers: [BadgeIconService]
})
export class BadgeModule {
}


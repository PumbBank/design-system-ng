import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HnModule, DialogModule} from 'projects/honey-ng/src/public_api';
import { TestDialogComponent } from './test-dialog.component';
import { ApproveModule } from 'projects/honey-ng/src/approve/approve.module';
import { ButtonModule } from 'projects/honey-ng/src/button/button.module';

@NgModule({
  declarations: [
    AppComponent,
    TestDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HnModule,
    ButtonModule,
    ApproveModule,
    ReactiveFormsModule,
    DialogModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    TestDialogComponent
  ]
})
export class AppModule { }

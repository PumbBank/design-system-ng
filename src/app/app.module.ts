import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HnModule, DialogModule } from 'projects/honey-ng/src/public_api';
import { TestDialogComponet } from './test-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    TestDialogComponet
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HnModule,
    ReactiveFormsModule,
    DialogModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    TestDialogComponet
  ]
})
export class AppModule { }

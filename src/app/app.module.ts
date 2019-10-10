import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HnModule, DialogModule, MillSelectModule, HintModule, InputModule } from 'projects/honey-ng/src/public_api';
import { ApproveModule } from 'projects/honey-ng/src/approve/approve.module';
import { ButtonModule } from 'projects/honey-ng/src/button/button.module';
import { FileUploadModule } from 'projects/honey-ng/src/file-upload/file-upload.module';
import { FormControlDisabledModule } from 'projects/honey-ng/src/form-control-disabled/form-control-disabled.module';
import { PageMillSelectComponent } from './routs/mill-select/page-mill-select.component';
import { SettlementService } from './services/settlement.service';
import { HttpClientModule } from '@angular/common/http';
import { PageMillInputComponent } from './routs/mill-input/page-mill-input';

const MILL_MODULES = [
  MillSelectModule,
  HintModule,
  InputModule
];

@NgModule({
  declarations: [
    AppComponent,
    PageMillSelectComponent,
    PageMillInputComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HnModule,
    ButtonModule,
    ApproveModule,
    FileUploadModule,
    FormControlDisabledModule,
    ReactiveFormsModule,
    FormsModule,
    DialogModule.forRoot(),
    ...MILL_MODULES
  ],
  providers: [
    SettlementService
  ],
  bootstrap: [AppComponent],
  entryComponents: [

  ]
})
export class AppModule { }

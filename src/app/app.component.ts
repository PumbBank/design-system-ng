import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DialogService } from 'projects/honey-ng/src/lib/modules/dialog/services/dialog-service';
import { TestDialogComponet } from './test-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  control = new FormControl('hi');
  title = 'hn-angular-test';

  fg = new FormGroup({
    name: new FormControl('')
  });

  constructor(
    private dialog: DialogService
  ) {}

  ngOnInit(): void {
    this.fg.controls.name.setValidators([(c: FormControl) => {
      return c.value.length > 3 ? {error: ''} : null;
    }, Validators.required])
  }

  openDialog() {
    this.dialog.openDialog(TestDialogComponet);
  }
}

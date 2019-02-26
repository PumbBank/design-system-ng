import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  control = new FormControl('hi');
  title = 'hn-angular-test';
  dialog = false;

  fg = new FormGroup({
    name: new FormControl('')
  });

  ngOnInit(): void {
    this.fg.controls.name.setValidators([(c: FormControl) => {
      return c.value.length > 3 ? {error: ''} : null;
    }, Validators.required])
  }
}

import { routes } from './app-routing.module';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  routes = routes;

  control1 = new FormControl('');

  constructor(
  ) { }

  ngOnInit() {

  }
}

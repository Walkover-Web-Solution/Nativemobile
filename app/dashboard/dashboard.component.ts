import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '~/store';

@Component({
  selector: 'ns-dashboard',
  moduleId: module.id,
  templateUrl: `./dashboard.component.html`,
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  constructor(private store: Store<AppState>, private routerExtensions: RouterExtensions) {
  }

  ngOnInit() {

  }
}

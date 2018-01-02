import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import * as _ from 'lodash';
import * as moment from 'moment/moment';
import { AppState } from '~/store';
import { Store } from '@ngrx/store';
import { ObservableArray } from 'tns-core-modules/data/observable-array/observable-array';
import { createSelector } from 'reselect';

@Component({
  selector: 'ns-stock-add',
  moduleId: module.id,
  templateUrl: `./stockAdd.component.html`,
  styleUrls: ['./stockAdd.component.css']
})
export class StockAddComponent implements OnInit {

  constructor(private store: Store<AppState>) {

  }

  ngOnInit() {
    //
  }
}

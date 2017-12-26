import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import * as _ from 'lodash';
import * as moment from 'moment/moment';
import { AppState } from '~/store';
import { Store } from '@ngrx/store';
import { ObservableArray } from 'tns-core-modules/data/observable-array/observable-array';
import { createSelector } from 'reselect';

@Component({
  selector: 'ns-sale-add',
  moduleId: module.id,
  templateUrl: `./saleAdd.component.html`,
  styleUrls: ['./salesAdd.component.scss']
})
export class SaleAddComponent implements OnInit {

  constructor(private store: Store<AppState>) {

  }

  ngOnInit() {
    //
  }
}

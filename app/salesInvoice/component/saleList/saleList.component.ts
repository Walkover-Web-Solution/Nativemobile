import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import * as _ from 'lodash';
import * as moment from 'moment/moment';
import { AppState } from '~/store';
import { Store } from '@ngrx/store';
import { ObservableArray } from 'tns-core-modules/data/observable-array/observable-array';
import { createSelector } from 'reselect';
import { RouterExtensions } from 'nativescript-angular/router';
import { DrawerTransitionBase } from 'nativescript-pro-ui/sidedrawer';
import { RadSideDrawerComponent } from 'nativescript-pro-ui/sidedrawer/angular';
import { MyDrawerItem } from '~/shared/my-drawer-item/my-drawer-item';

@Component({
  selector: 'ns-sale-list',
  moduleId: module.id,
  templateUrl: `./saleList.component.html`,
  styleUrls: ['./salesList.component.scss']
})
export class SaleListComponent implements OnInit {
  public navItemObj$: Observable<MyDrawerItem[]>;
  @ViewChild("drawer") public drawerComponent: RadSideDrawerComponent;
  private _sideDrawerTransition: DrawerTransitionBase;
  constructor(private store: Store<AppState>, private routerExtensions: RouterExtensions) {
    this.navItemObj$ = this.store.select(p => p.general.navDrawerObj).map(p => {
      for (const iterator of p) {
        if (iterator.router) {
          if (iterator.router === '/sale') {
            iterator.isSelected = true;
          } else {
            iterator.isSelected = false;
          }
        }
      }
      return p;
    });
  }

  ngOnInit() {
    //
  }
}

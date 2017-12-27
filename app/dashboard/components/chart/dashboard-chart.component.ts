import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { MyDrawerItem } from '~/shared/my-drawer-item/my-drawer-item';
import { RadSideDrawerComponent } from 'nativescript-pro-ui/sidedrawer/angular';
import { DrawerTransitionBase } from 'nativescript-pro-ui/sidedrawer';
import { Store } from '@ngrx/store';
import { AppState } from '~/store';
import { RouterExtensions } from 'nativescript-angular/router';

@Component({
  selector: 'ns-dashboard-chart',
  moduleId: module.id,
  templateUrl: `./dashboard-chart.component.html`
})
export class DashboardChartComponent implements OnInit {

  public navItemObj$: Observable<MyDrawerItem[]>;
  @ViewChild("drawer") public drawerComponent: RadSideDrawerComponent;
  private _sideDrawerTransition: DrawerTransitionBase;
  constructor(private store: Store<AppState>, private routerExtensions: RouterExtensions) {
    this.navItemObj$ = this.store.select(p => p.general.navDrawerObj);
  }

  ngOnInit() {

  }

  public get sideDrawerTransition(): DrawerTransitionBase {
    return this._sideDrawerTransition;
  }

  public onDrawerButtonTap(): void {
    this.drawerComponent.sideDrawer.showDrawer();
  }
}

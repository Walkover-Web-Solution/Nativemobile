import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { DrawerTransitionBase } from 'nativescript-pro-ui/sidedrawer';
import { Store } from '@ngrx/store';
import { AppState } from '~/store';
import { MyDrawerItem } from '~/shared/my-drawer-item/my-drawer-item';
import { Observable } from 'rxjs/Observable';
import { RadSideDrawerComponent } from 'nativescript-pro-ui/sidedrawer/angular';
import { RouterExtensions } from 'nativescript-angular/router';

@Component({
  selector: 'ns-dashboard',
  moduleId: module.id,
  templateUrl: `./dashboard.component.html`,
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
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

import { Component, ViewChild } from '@angular/core';
import { MyDrawerItem } from '~/shared/my-drawer-item/my-drawer-item';
import { Observable } from 'rxjs/Observable';
import { RadSideDrawerComponent } from 'nativescript-pro-ui/sidedrawer/angular';
import { AppState } from '~/store';
import { Store } from '@ngrx/store';
import { DrawerTransitionBase } from 'nativescript-pro-ui/sidedrawer';

@Component({
  selector: 'ns-currencies',
  moduleId: module.id,
  templateUrl: './currencies.component.html'
})

export class CurrenciesComponent {

  public navItemObj$: Observable<MyDrawerItem[]>;
  @ViewChild("drawer") public drawerComponent: RadSideDrawerComponent;
  public items: Array<{ name: string, shortName: string }>;
  private _sideDrawerTransition: DrawerTransitionBase;
  constructor(private store: Store<AppState>) {
    this.navItemObj$ = this.store.select(p => p.general.navDrawerObj).map(p => {
      for (const iterator of p) {
        if (iterator.router) {
          if (iterator.router === '/settings') {
            iterator.isSelected = true;
          } else {
            iterator.isSelected = false;
          }
        }
      }
      return p;
    });

    this.items = [
      { shortName: 'CAD', name: 'Canadian Dollar'},
      { shortName: 'EUR', name: 'Euro'},
      { shortName: 'IND', name: 'India'},
      { shortName: 'USD', name: 'Us Dollar'}
    ];
  }

  public get sideDrawerTransition(): DrawerTransitionBase {
    return this._sideDrawerTransition;
  }

  public onDrawerButtonTap(): void {
    this.drawerComponent.sideDrawer.showDrawer();
  }
}

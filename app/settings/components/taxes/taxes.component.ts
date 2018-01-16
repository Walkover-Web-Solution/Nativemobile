import { Component, ViewChild } from '@angular/core';
import { MyDrawerItem } from '~/shared/my-drawer-item/my-drawer-item';
import { Observable } from 'rxjs/Observable';
import { RadSideDrawerComponent } from 'nativescript-pro-ui/sidedrawer/angular';
import { AppState } from '~/store';
import { Store } from '@ngrx/store';
import { DrawerTransitionBase } from 'nativescript-pro-ui/sidedrawer';
import { RouterExtensions } from 'nativescript-angular/router';

@Component({
  selector: 'ns-taxes',
  moduleId: module.id,
  templateUrl: './taxes.component.html'
})

export class TaxesComponent {

  public navItemObj$: Observable<MyDrawerItem[]>;
  @ViewChild("drawer") public drawerComponent: RadSideDrawerComponent;
  public items: Array<{ name: string }>;
  private _sideDrawerTransition: DrawerTransitionBase;
  constructor(private store: Store<AppState>, private routerExtensions: RouterExtensions) {
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
      { name: 'GST 0%'},
      { name: 'GST 5%'},
      { name: 'GST 12%'},
      { name: 'GST 18%'},
      { name: 'IGST 0%'},
      { name: 'IGST 5%'},
      { name: 'IGST 12%'},
      { name: 'IGST 18%'},

    ];
  }

  public get sideDrawerTransition(): DrawerTransitionBase {
    return this._sideDrawerTransition;
  }

  public onDrawerButtonTap(): void {
    this.drawerComponent.sideDrawer.showDrawer();
  }

  public createCurrencies() {
    this.routerExtensions.navigate(['/create-taxes']);
  }
}

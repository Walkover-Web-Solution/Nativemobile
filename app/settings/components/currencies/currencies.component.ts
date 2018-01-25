import {Component, OnInit, ViewChild} from '@angular/core';
import {MyDrawerItem} from '~/shared/my-drawer-item/my-drawer-item';
import {Observable} from 'rxjs/Observable';
import {RadSideDrawerComponent} from 'nativescript-pro-ui/sidedrawer/angular';
import {AppState} from '~/store';
import {Store} from '@ngrx/store';
import {DrawerTransitionBase} from 'nativescript-pro-ui/sidedrawer';
import {RouterExtensions} from 'nativescript-angular/router';
import {ReplaySubject} from "rxjs/ReplaySubject";
import {Page} from "tns-core-modules/ui/page";


@Component({
  selector: 'ns-currencies',
  moduleId: module.id,
  templateUrl: './currencies.component.html'
})

export class CurrenciesComponent implements OnInit {

  public navItemObj$: Observable<MyDrawerItem[]>;
  @ViewChild("drawer") public drawerComponent: RadSideDrawerComponent;
  public currenciesStream$: Observable<string[]>;
  private _sideDrawerTransition: DrawerTransitionBase;
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  constructor(private store: Store<AppState>, private routerExtensions: RouterExtensions, private page: Page) {
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

    this.currenciesStream$ = this.store.select(state => state.general.currencies).takeUntil(this.destroyed$);
    this.page.on(Page.unloadedEvent, ev => this.ngOnDestroy());
  }

  public ngOnInit() {
    //
  }

  public get sideDrawerTransition(): DrawerTransitionBase {
    return this._sideDrawerTransition;
  }

  public onDrawerButtonTap(): void {
    this.drawerComponent.sideDrawer.showDrawer();
  }

  public createCurrencies() {
    this.routerExtensions.navigate(['/create-currencies']);
  }

  public ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}

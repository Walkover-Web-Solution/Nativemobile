import {Component, OnInit, ViewChild} from '@angular/core';
import {MyDrawerItem} from '~/shared/my-drawer-item/my-drawer-item';
import {Observable} from 'rxjs/Observable';
import {RadSideDrawerComponent} from 'nativescript-pro-ui/sidedrawer/angular';
import {AppState} from '~/store';
import {Store} from '@ngrx/store';
import {DrawerTransitionBase} from 'nativescript-pro-ui/sidedrawer';
import {RouterExtensions} from 'nativescript-angular/router';
import {TaxResponse} from '~/models/api-models/Company';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {Page} from 'tns-core-modules/ui/page/page';
import {CompanyActions} from '~/actions/company/company.action';
import {LoaderService} from "~/services/loader.service";

@Component({
  selector: 'ns-taxes',
  moduleId: module.id,
  templateUrl: './taxes.component.html'
})

export class TaxesComponent implements OnInit {

  public navItemObj$: Observable<MyDrawerItem[]>;
  @ViewChild("drawer") public drawerComponent: RadSideDrawerComponent;
  public taxList$: Observable<TaxResponse[]>;
  public isTaxLoading$: Observable<boolean>;
  private _sideDrawerTransition: DrawerTransitionBase;
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  constructor(private store: Store<AppState>, private routerExtensions: RouterExtensions, private page: Page,
              private _companyActions: CompanyActions, private _loaderService: LoaderService) {
    this.store.dispatch(this._companyActions.getTax());
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
    }).takeUntil(this.destroyed$);

    this.taxList$ = this.store.select(p => p.company.taxes).takeUntil(this.destroyed$);
    this.isTaxLoading$ = this.store.select(p => p.company.isTaxesLoading).takeUntil(this.destroyed$);
    this.page.on(Page.unloadedEvent, ev => this.ngOnDestroy());
  }

  public ngOnInit(): void {
    this.isTaxLoading$.subscribe(s => {
      if (s) {
        this._loaderService.showLoader();
      } else {
        this._loaderService.hideLoader();
      }
    })
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

  public ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}

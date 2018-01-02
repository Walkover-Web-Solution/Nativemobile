import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { VerifyEmailResponseModel } from '../models/api-models/loginModels';
import { AppState } from '../store';
import { Store } from '@ngrx/store';
import { RouterExtensions } from 'nativescript-angular/router';
import { LoginActions } from '../actions/login/login.action';
import { Router } from '@angular/router';
import { RadSideDrawerComponent } from "nativescript-pro-ui/sidedrawer/angular";
import { DrawerTransitionBase, SlideInOnTopTransition } from "nativescript-pro-ui/sidedrawer";
import { CompanyActions } from '~/actions/company/company.action';
import { CompanyResponse } from '~/models/api-models/Company';
import { MyDrawerItem } from '~/shared/my-drawer-item/my-drawer-item';
import { createSelector } from 'reselect';
import { TNSFontIconService } from 'nativescript-ngx-fonticon';


@Component({
  selector: 'ns-home',
  moduleId: module.id,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  public logoutIcon: string = String.fromCharCode(0xf073);
  @ViewChild("drawer") drawerComponent: RadSideDrawerComponent;
  private _sideDrawerTransition: DrawerTransitionBase;
  public userStream$: Observable<VerifyEmailResponseModel>;
  public activeCompany: CompanyResponse;
  public companyData$: Observable<{ companies: CompanyResponse[], uniqueName: string }>
  public companies: MyDrawerItem[] = [];
  constructor(private store: Store<AppState>, private routerExtensions: RouterExtensions, private _loginActions: LoginActions,
    private _companyActions: CompanyActions) {
    this.userStream$ = this.store.select(s => s.session.user);
    this.companyData$ = this.store.select(createSelector([(state: AppState) => state.session.companies, (state: AppState) => state.session.companyUniqueName], (companies, uniqueName) => {
      return { companies, uniqueName };
    }));
  }

  public ngOnInit(): void {
    this.store.dispatch(this._companyActions.refreshCompanies());

    this.companyData$.subscribe(res => {
      if (!res.companies) {
        return;
      }

      let allCmps: MyDrawerItem[] = [];
      res.companies.forEach(cmp => {
        let item = new MyDrawerItem();
        item.title = cmp.name;
        item.needTopHr = true;
        item.customData = cmp;
        if (cmp.uniqueName === res.uniqueName) {
          item.icon = String.fromCharCode(0xf00c);
          item.isSelected = true;
        }

        allCmps.push(item);
      });
      this.companies = allCmps;

      this.activeCompany = res.companies.find(cmp => {
        return cmp.uniqueName === res.uniqueName;
      });

    });
  }
  public get sideDrawerTransition(): DrawerTransitionBase {
    return this._sideDrawerTransition;
  }

  public ngOnDestroy(): void {
    // this.lo
  }
  public onDrawerButtonTap(): void {
    this.drawerComponent.sideDrawer.showDrawer();
  }

  public changeCompany(item: MyDrawerItem) {
    this.store.dispatch(this._companyActions.changeCompany(item.customData.uniqueName));
    this.drawerComponent.sideDrawer.toggleDrawerState();
  }
}

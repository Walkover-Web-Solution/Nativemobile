import { Component, OnInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { ObservableArray } from 'tns-core-modules/data/observable-array/observable-array';
import { AppState } from '~/store';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { CompanyResponse, ActiveFinancialYear } from '~/models/api-models/Company';
import { createSelector } from 'reselect';
import * as _ from 'lodash';
import * as moment from 'moment/moment';
import * as CircularJSON from 'circular-json';
import { IRevenueChartClosingBalanceResponse, IChildGroups, ChartType, ChartFilterType } from '~/models/interfaces/dashboard.interface';
import { AccountChartDataLastCurrentYear } from '~/models/view-models/AccountChartDataLastCurrentYear';
import { INameUniqueName } from '~/models/interfaces/nameUniqueName.interface';
import { DashboardActions } from '~/actions/dashboard/dashboard.action';
import * as dialogs from "ui/dialogs";
import { ChartFilterConfigs } from '~/models/api-models/Dashboard';
import { Page } from 'tns-core-modules/ui/page/page';
import { ReplaySubject } from 'rxjs/ReplaySubject';
@Component({
  selector: 'ns-revenue-chart,[ns-revenue-chart]',
  moduleId: module.id,
  templateUrl: `./revenue.component.html`,
  styleUrls: ["./revenue.component.scss"]
})
export class RevenueChartComponent implements OnInit, OnDestroy {

  public chartType: ChartType = ChartType.Revenue;
  public requestInFlight: boolean;
  public activeYearAccounts: IChildGroups[] = [];
  public lastYearAccounts: IChildGroups[] = [];
  public revenueChartData$: Observable<IRevenueChartClosingBalanceResponse>;
  public accountStrings: AccountChartDataLastCurrentYear[] = [];
  public activeYearAccountsRanks: ObservableArray<any> = new ObservableArray([]);
  public lastYearAccountsRanks: ObservableArray<any> = new ObservableArray([]);
  public activeYearGrandAmount: number = 0;
  public lastYearGrandAmount: number = 0;
  public activePieChartAmount: number = 0;
  public lastPieChartAmount: number = 0;

  public chartFilterType$: Observable<ChartFilterType>;
  public chartFilterTitle: string = 'Custom';
  public activeYearChartFormatedDate: string;
  public lastYearChartFormatedDate: string;
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  constructor(private store: Store<AppState>, private _dashboardActions: DashboardActions, private page: Page) {
    this.revenueChartData$ = this.store.select(p => p.dashboard.revenueChart).takeUntil(this.destroyed$);

    this.chartFilterType$ = this.store.select(p => p.dashboard.revenueChartFilter).takeUntil(this.destroyed$);
    this.page.on(Page.unloadedEvent, ev => this.ngOnDestroy());
  }

  ngOnInit() {
    // this.chartFilterType$.subscribe(p => this.fetchChartData())
    this.fetchChartData();
    this.revenueChartData$.subscribe(rvn => {
      // if (rvn) {
      if (rvn && rvn.revenuefromoperationsActiveyear && rvn.otherincomeActiveyear) {
        let revenuefromoperationsAccounts = [].concat.apply([], rvn.revenuefromoperationsActiveyear.childGroups);
        let otherincomeAccounts = [].concat.apply([], rvn.otherincomeActiveyear.childGroups);
        let groups = _.unionBy(revenuefromoperationsAccounts as IChildGroups[], otherincomeAccounts as IChildGroups[]) as IChildGroups[];
        this.activeYearAccounts = groups;
      } else {
        this.resetActiveYearChartData();
      }

      if (rvn && rvn.revenuefromoperationsLastyear && rvn.otherincomeLastyear) {
        let revenuefromoperationsAccounts = [].concat.apply([], rvn.revenuefromoperationsLastyear.childGroups);
        let otherincomeAccounts = [].concat.apply([], rvn.otherincomeLastyear.childGroups);
        let lastAccounts = _.unionBy(revenuefromoperationsAccounts as IChildGroups[], otherincomeAccounts as IChildGroups[]) as IChildGroups[];
        this.lastYearAccounts = lastAccounts;
      } else {
        this.resetLastYearChartData();
      }
      this.generateCharts();
      // }
      this.requestInFlight = false;
    });
  }

  public generateCharts() {
    this.accountStrings = _.uniqBy(this.generateActiveYearString().concat(this.generateLastYearString()), 'uniqueName');
    this.accountStrings.forEach((ac) => {
      ac.activeYear = 0;
      ac.lastYear = 0;
      let index = -1;
      index = _.findIndex(this.activeYearAccounts, (p) => p.uniqueName === ac.uniqueName);
      if (index !== -1) {
        ac.activeYear = this.activeYearAccounts[index].closingBalance.amount;
      }
      index = -1;
      index = _.findIndex(this.lastYearAccounts, (p) => p.uniqueName === ac.uniqueName);
      if (index !== -1) {
        ac.lastYear = this.lastYearAccounts[index].closingBalance.amount;
      }
    });

    this.accountStrings = _.filter(this.accountStrings, (a) => {
      return !(a.activeYear === 0 && a.lastYear === 0);
    });

    let activeAccounts = [];
    let lastAccounts = [];

    this.accountStrings.forEach(p => {
      activeAccounts.push({ name: p.name, amount: p.activeYear });
    });

    this.accountStrings.forEach(p => {
      lastAccounts.push({ name: p.name, amount: p.lastYear });
    });

    while (this.activeYearAccountsRanks.length) {
      this.activeYearAccountsRanks.pop();
    }
    this.activeYearAccountsRanks.push(activeAccounts);
    this.activeYearGrandAmount = _.sumBy(activeAccounts, 'amount') || 0;
    this.activePieChartAmount = this.activeYearGrandAmount >= 1 ? 100 : 0;

    while (this.lastYearAccountsRanks.length) {
      this.lastYearAccountsRanks.pop();
    }
    this.lastYearAccountsRanks.push(lastAccounts);
    this.lastYearGrandAmount = _.sumBy(lastAccounts, 'amount') || 0;
    this.lastPieChartAmount = this.lastYearGrandAmount >= 1 ? 100 : 0;
  }

  public generateActiveYearString(): INameUniqueName[] {
    let activeStrings: INameUniqueName[] = [];
    this.activeYearAccounts.map(acc => {
      activeStrings.push({ uniqueName: acc.uniqueName, name: acc.groupName });
    });
    return activeStrings;
  }

  public generateLastYearString(): INameUniqueName[] {
    let lastStrings: INameUniqueName[] = [];
    this.lastYearAccounts.map(acc => {
      lastStrings.push({ uniqueName: acc.uniqueName, name: acc.groupName });
    });
    return lastStrings;
  }

  public fetchChartData() {
    this.requestInFlight = true;
    this.store.dispatch(this._dashboardActions.getRevenueChartDataActiveYear(false));
    this.store.dispatch(this._dashboardActions.getRevenueChartDataLastYear(false));
  }

  public calculatePieChartPer(t) {
    let activeYearIndexTotal = this.activeYearAccountsRanks.getItem(t.pointIndex).amount || 0;
    let lastYearIndexTotal = this.lastYearAccountsRanks.getItem(t.pointIndex).amount || 0;

    this.activePieChartAmount = Math.round((activeYearIndexTotal * 100) / this.activeYearGrandAmount) || 0;
    this.lastPieChartAmount = Math.round((lastYearIndexTotal * 100) / this.lastYearGrandAmount) || 0;
  }

  public resetActiveYearChartData() {
    this.activeYearAccounts = [];
    while (this.activeYearAccountsRanks.length) {
      this.activeYearAccountsRanks.pop();
    }
    // this.activeBarSeries.nativeElement.items.length = 0;
    // this.activeYearAccountsRanks = new ObservableArray([]);
    this.activeYearGrandAmount = 0;
    this.activePieChartAmount = 0;
  }

  public resetLastYearChartData() {
    this.lastYearAccounts = [];
    while (this.lastYearAccountsRanks.length) {
      this.lastYearAccountsRanks.pop();
    }
    // this.lastYearAccountsRanks = new ObservableArray([]);
    this.lastYearGrandAmount = 0;
    this.lastPieChartAmount = 0;
  }



  public ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}

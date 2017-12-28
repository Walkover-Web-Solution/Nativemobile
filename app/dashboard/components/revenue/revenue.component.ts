import { Component, OnInit } from '@angular/core';
import { ObservableArray } from 'tns-core-modules/data/observable-array/observable-array';
import { AppState } from '~/store';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { CompanyResponse, ActiveFinancialYear } from '~/models/api-models/Company';
import { createSelector } from 'reselect';
import * as _ from 'lodash';
import * as moment from 'moment/moment';
import { IRevenueChartClosingBalanceResponse, IChildGroups } from '~/models/interfaces/dashboard.interface';
import { AccountChartDataLastCurrentYear } from '~/models/view-models/AccountChartDataLastCurrentYear';
import { INameUniqueName } from '~/models/interfaces/nameUniqueName.interface';
import { DashboardActions } from '~/actions/dashboard/dashboard.action';
import * as dialogs from "ui/dialogs";
@Component({
  selector: 'ns-revenue-chart',
  moduleId: module.id,
  templateUrl: `./revenue.component.html`
})
export class RevenueChartComponent implements OnInit {
  public activeFinancialYear: ActiveFinancialYear;
  public lastFinancialYear: ActiveFinancialYear;
  public activeYearAccounts: IChildGroups[] = [];
  public lastYearAccounts: IChildGroups[] = [];
  public companyData$: Observable<{ companies: CompanyResponse[], uniqueName: string }>
  public revenueChartData$: Observable<IRevenueChartClosingBalanceResponse>;
  public accountStrings: AccountChartDataLastCurrentYear[] = [];
  public activeYearAccountsRanks: ObservableArray<any>;
  public lastYearAccountsRanks: ObservableArray<any>;
  public activeYearGrandAmount: number = 0;
  public lastYearGrandAmount: number = 0;
  public activePieChartAmount: number = 0;
  public lastPieChartAmount: number = 0;
  public chartFilterType$: Observable<string>;
  constructor(private store: Store<AppState>, private _dashboardActions: DashboardActions) {
    this.revenueChartData$ = this.store.select(p => p.dashboard.revenueChart);
    this.companyData$ = this.store.select(createSelector([(state: AppState) => state.session.companies, (state: AppState) => state.session.companyUniqueName], (companies, uniqueName) => {
      return { companies, uniqueName };
    }));
    this.chartFilterType$ = this.store.select(p => p.dashboard.revenueChartFilter);
  }

  ngOnInit() {
    // get activeCompany and set activeFinacial Year and LastFinacial Year
    this.companyData$.subscribe(res => {
      if (!res.companies) {
        return;
      }
      let financialYears = [];
      let activeCmp = res.companies.find(p => p.uniqueName === res.uniqueName);
      if (activeCmp) {
        this.activeFinancialYear = activeCmp.activeFinancialYear;

        if (activeCmp.financialYears.length > 1) {
          financialYears = activeCmp.financialYears.filter(cm => cm.uniqueName !== this.activeFinancialYear.uniqueName);
          financialYears = _.filter(financialYears, (it: ActiveFinancialYear) => {
            let a = moment(this.activeFinancialYear.financialYearStarts, 'DD-MM-YYYY');
            let b = moment(it.financialYearEnds, 'DD-MM-YYYY');

            return b.diff(a, 'days') < 0;
          });
          financialYears = _.orderBy(financialYears, (p: ActiveFinancialYear) => {
            let a = moment(this.activeFinancialYear.financialYearStarts, 'DD-MM-YYYY');
            let b = moment(p.financialYearEnds, 'DD-MM-YYYY');
            return b.diff(a, 'days');
          }, 'desc');
          this.lastFinancialYear = financialYears[0];
        }

        this.fetchChartData();
      }
    });

    this.revenueChartData$.subscribe(rvn => {
      if (rvn) {
        if (rvn.revenuefromoperationsActiveyear && rvn.otherincomeActiveyear) {
          let revenuefromoperationsAccounts = [].concat.apply([], rvn.revenuefromoperationsActiveyear.childGroups);
          let otherincomeAccounts = [].concat.apply([], rvn.otherincomeActiveyear.childGroups);
          let groups = _.unionBy(revenuefromoperationsAccounts as IChildGroups[], otherincomeAccounts as IChildGroups[]) as IChildGroups[];
          this.activeYearAccounts = groups;
        }

        if (rvn.revenuefromoperationsLastyear && rvn.otherincomeLastyear) {
          let revenuefromoperationsAccounts = [].concat.apply([], rvn.revenuefromoperationsLastyear.childGroups);
          let otherincomeAccounts = [].concat.apply([], rvn.otherincomeLastyear.childGroups);
          let lastAccounts = _.unionBy(revenuefromoperationsAccounts as IChildGroups[], otherincomeAccounts as IChildGroups[]) as IChildGroups[];
          this.lastYearAccounts = lastAccounts;
        }
      }
      this.generateCharts();
    });

    this.chartFilterType$.subscribe(p => {
      if (p) {
        let beginDate: string;
        let endDate: string;
        switch (p) {
          case '1':
            beginDate = moment().format("YYYY-MM-01");
            endDate = moment().format("YYYY-MM-") + moment().date();
            break;
          case '2':
            beginDate = moment().format("YYYY-MM-01");
            endDate = moment().format("YYYY-MM-") + moment().date();
            break;
          case '3':
            beginDate = moment().format("YYYY-MM-01");
            endDate = moment().format("YYYY-MM-") + moment().date();
            break;
          case '4':
            beginDate = moment().format("YYYY-MM-01");
            endDate = moment().format("YYYY-MM-") + moment().date();
            break;
          case '5':
            beginDate = moment().format("YYYY-MM-01");
            endDate = moment().format("YYYY-MM-") + moment().date();
            break;
          case '6':
            beginDate = moment().format("YYYY-MM-01");
            endDate = moment().format("YYYY-MM-") + moment().date();
            break;
          case '7':
            beginDate = moment().format("YYYY-MM-01");
            endDate = moment().format("YYYY-MM-") + moment().date();
            break;
          case '8':
            beginDate = moment().format("YYYY-MM-01");
            endDate = moment().format("YYYY-MM-") + moment().date();
            break;
          case '9':
            beginDate = moment().format("YYYY-MM-01");
            endDate = moment().format("YYYY-MM-") + moment().date();
            break;
        }
        // this.store.dispatch(this._dashboardActions.getRevenueChartData('1-1-2016',
        //   '31-12-2016', false));
      }
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

    this.activeYearAccountsRanks = new ObservableArray(activeAccounts);
    this.activeYearGrandAmount = _.sumBy(activeAccounts, 'amount') || 0;
    this.activePieChartAmount = this.activeYearGrandAmount >= 1 ? 100 : 0;

    this.lastYearAccountsRanks = new ObservableArray(lastAccounts);
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
    this.store.dispatch(this._dashboardActions.getRevenueChartDataActiveYear(this.activeFinancialYear.financialYearStarts,
      this.activeFinancialYear.financialYearEnds, false));

    if (this.lastFinancialYear) {
      this.store.dispatch(this._dashboardActions.getRevenueChartDataLastYear(this.lastFinancialYear.financialYearStarts, this.lastFinancialYear.financialYearEnds, false));
    }
  }

  public calculatePieChartPer(t) {
    let activeYearIndexTotal = this.activeYearAccountsRanks.getItem(t.pointIndex).amount || 0;
    let lastYearIndexTotal = this.lastYearAccountsRanks.getItem(t.pointIndex).amount || 0;

    this.activePieChartAmount = Math.round((activeYearIndexTotal * 100) / this.activeYearGrandAmount) || 0;
    this.lastPieChartAmount = Math.round((lastYearIndexTotal * 100) / this.lastYearGrandAmount) || 0;
  }

  public resetChartData() {
    console.log('reset called');
    this.activeYearAccounts = [];
    this.activeYearAccountsRanks = new ObservableArray([]);
    this.activeYearGrandAmount = 0;
    // this.pieChartAmount = 0;
  }
}

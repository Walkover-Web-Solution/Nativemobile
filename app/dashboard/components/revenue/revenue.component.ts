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
import { ChartFilterConfigs } from '~/models/api-models/Dashboard';
@Component({
  selector: 'ns-revenue-chart',
  moduleId: module.id,
  templateUrl: `./revenue.component.html`
})
export class RevenueChartComponent implements OnInit {
  public requestInFlight: boolean;
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
        } else {
          this.resetActiveYearChartData();
        }

        if (rvn.revenuefromoperationsLastyear && rvn.otherincomeLastyear) {
          let revenuefromoperationsAccounts = [].concat.apply([], rvn.revenuefromoperationsLastyear.childGroups);
          let otherincomeAccounts = [].concat.apply([], rvn.otherincomeLastyear.childGroups);
          let lastAccounts = _.unionBy(revenuefromoperationsAccounts as IChildGroups[], otherincomeAccounts as IChildGroups[]) as IChildGroups[];
          this.lastYearAccounts = lastAccounts;
        } else {
          this.resetLastYearChartData();
        }
        this.generateCharts();
      } else {
        this.resetActiveYearChartData();
        this.resetLastYearChartData();
      }
      this.requestInFlight = false;
    });

    this.chartFilterType$.subscribe(p => {
      if (p) {
        let dates = this.parseDates(p);
        this.requestInFlight = true;
        this.store.dispatch(this._dashboardActions.getRevenueChartDataActiveYear(dates.activeYear.startDate, dates.activeYear.endDate));
        this.store.dispatch(this._dashboardActions.getRevenueChartDataLastYear(dates.lastYear.startDate, dates.lastYear.endDate));
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
    this.requestInFlight = true;
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

  public resetActiveYearChartData() {
    this.activeYearAccounts = [];
    // this.activeYearAccountsRanks = new ObservableArray([]);
    this.activeYearGrandAmount = 0;
    this.activePieChartAmount = 0;
  }

  public resetLastYearChartData() {
    this.lastYearAccounts = [];
    // this.lastYearAccountsRanks = new ObservableArray([]);
    this.lastYearGrandAmount = 0;
    this.lastPieChartAmount = 0;
  }

  public parseDates(filterType: string): ChartFilterConfigs {
    let config = new ChartFilterConfigs();
    switch (filterType) {
      case '1': // This Month to DateS
        config.activeYear.startDate = moment().startOf('month').format('DD-MM-YYYY');
        config.activeYear.endDate = moment().format('DD-MM-YYYY');

        config.lastYear.startDate = moment(config.activeYear.startDate, 'DD-MM-YYYY').subtract(1, 'month').format('DD-MM-YYYY');
        config.lastYear.endDate = moment(config.activeYear.endDate, 'DD-MM-YYYY').endOf('month').subtract(1, 'month').format('DD-MM-YYYY');
        return config;
      case '2': // This Quarter to Date
        config.activeYear.startDate = moment().quarter(moment().quarter()).startOf('quarter').format('DD-MM-YYYY');
        config.activeYear.endDate = moment().format('DD-MM-YYYY');

        config.lastYear.startDate = moment(config.activeYear.startDate, 'DD-MM-YYYY').quarter(moment().quarter()).startOf('quarter').subtract(1, 'quarter').format('DD-MM-YYYY');
        config.lastYear.endDate = moment(config.activeYear.startDate, 'DD-MM-YYYY').quarter(moment().quarter()).endOf('quarter').subtract(1, 'quarter').format('DD-MM-YYYY');
        return config;
      case '3': // This Financial Year to Date
        if (this.activeFinancialYear) {
          config.activeYear.startDate = moment(this.activeFinancialYear.financialYearStarts, 'DD-MM-YYYY').startOf('day').format('DD-MM-YYYY');
          config.activeYear.endDate = moment(this.activeFinancialYear.financialYearEnds, 'DD-MM-YYYY').endOf('day').format('DD-MM-YYYY');
        } else {
          config.activeYear.startDate = '00-00-0000';
          config.activeYear.endDate = '00-00-0000';
        }

        if (this.lastFinancialYear) {
          config.lastYear.startDate = moment(this.lastFinancialYear.financialYearStarts, 'DD-MM-YYYY').subtract(1, 'year').startOf('day').format('DD-MM-YYYY');
          config.lastYear.endDate = moment(this.lastFinancialYear.financialYearEnds, 'DD-MM-YYYY').endOf('day').subtract(1, 'year').format('DD-MM-YYYY');
        } else {
          config.lastYear.startDate = '00-00-0000';
          config.lastYear.endDate = '00-00-0000';
        }
        return config;
      case '4': // This Year to Date
        config.activeYear.startDate = moment().startOf('year').format('DD-MM-YYYY');
        config.activeYear.endDate = moment().format('DD-MM-YYYY');

        config.lastYear.startDate = moment(config.activeYear.startDate, 'DD-MM-YYYY').subtract(1, 'year').format('DD-MM-YYYY');
        config.lastYear.endDate = moment(config.activeYear.endDate, 'DD-MM-YYYY').endOf('year').subtract(1, 'year').format('DD-MM-YYYY');
        return config;
      case '5': // Last Month
        config.activeYear.startDate = moment().startOf('month').subtract(1, 'month').format('DD-MM-YYYY');
        config.activeYear.endDate = moment().endOf('month').subtract(1, 'month').format('DD-MM-YYYY');

        config.lastYear.startDate = moment(config.activeYear.startDate, 'DD-MM-YYYY').startOf('month').subtract(1, 'month').format('DD-MM-YYYY');
        config.lastYear.endDate = moment(config.activeYear.endDate, 'DD-MM-YYYY').endOf('month').subtract(1, 'month').format('DD-MM-YYYY');
        return config;
      case '6': // Last Quater
        config.activeYear.startDate = moment().quarter(moment().quarter()).startOf('quarter').subtract(1, 'quarter').format('DD-MM-YYYY');
        config.activeYear.endDate = moment().quarter(moment().quarter()).endOf('quarter').subtract(1, 'quarter').format('DD-MM-YYYY');

        config.lastYear.startDate = moment().quarter(moment(config.activeYear.startDate, 'DD-MM-YYYY').quarter()).startOf('quarter').subtract(1, 'quarter').format('DD-MM-YYYY');
        config.lastYear.endDate = moment().quarter(moment(config.activeYear.startDate, 'DD-MM-YYYY').quarter()).endOf('quarter').subtract(1, 'quarter').format('DD-MM-YYYY');
        return config;
      case '7': // Last Fiancial Year
        if (this.activeFinancialYear) {
          config.activeYear.startDate = moment(this.activeFinancialYear.financialYearStarts, 'DD-MM-YYYY').startOf('day').subtract(1, 'year').format('DD-MM-YYYY');
          config.activeYear.endDate = moment(this.activeFinancialYear.financialYearStarts, 'DD-MM-YYYY').endOf('day').subtract(1, 'year').format('DD-MM-YYYY');
        } else {
          config.activeYear.startDate = '00-00-0000';
          config.activeYear.endDate = '00-00-0000';
        }

        if (this.lastFinancialYear) {
          config.lastYear.startDate = moment(this.lastFinancialYear.financialYearStarts, 'DD-MM-YYYY').startOf('day').subtract(1, 'year').format('DD-MM-YYYY');
          config.lastYear.endDate = moment(this.lastFinancialYear.financialYearStarts, 'DD-MM-YYYY').endOf('day').subtract(1, 'year').format('DD-MM-YYYY');
        } else {
          config.lastYear.startDate = '00-00-0000';
          config.lastYear.endDate = '00-00-0000';
        }
        return config;
      case '8': // Last Year
        config.activeYear.startDate = moment().startOf('year').subtract(1, 'year').format('DD-MM-YYYY');
        config.activeYear.endDate = moment().endOf('year').subtract(1, 'year').format('DD-MM-YYYY');

        config.lastYear.startDate = moment(config.activeYear.startDate, 'DD-MM-YYYY').startOf('year').subtract(1, 'year').format('DD-MM-YYYY');
        config.lastYear.endDate = moment(config.activeYear.endDate, 'DD-MM-YYYY').endOf('year').subtract(1, 'year').format('DD-MM-YYYY');
        return config;
      case '9':
        return config;
      default:
        return config;
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { ActiveFinancialYear, CompanyResponse } from '~/models/api-models/Company';
import { IChildGroups, IExpensesChartClosingBalanceResponse } from '~/models/interfaces/dashboard.interface';
import { Observable } from 'rxjs';
import * as _ from 'lodash';
import * as moment from 'moment/moment';
import { AppState } from '~/store';
import { Store } from '@ngrx/store';
import { DashboardActions } from '~/actions/dashboard/dashboard.action';
import { INameUniqueName } from '~/models/interfaces/nameUniqueName.interface';
import { AccountChartDataLastCurrentYear } from '~/models/view-models/AccountChartDataLastCurrentYear';
import { ObservableArray } from 'tns-core-modules/data/observable-array/observable-array';
import { createSelector } from 'reselect';
import { ChartFilterConfigs } from '~/models/api-models/Dashboard';
import { Page } from 'tns-core-modules/ui/page/page';
import { ReplaySubject } from 'rxjs/ReplaySubject';

@Component({
  selector: 'ns-expenses-chart,[ns-expenses-chart]',
  moduleId: module.id,
  templateUrl: `./expenses.component.html`,
  styleUrls: ["./expenses.component.scss"]
})
export class ExpensesChartComponent implements OnInit {
  public requestInFlight: boolean;
  public activeFinancialYear: ActiveFinancialYear;
  public lastFinancialYear: ActiveFinancialYear;
  public activeYearAccounts: IChildGroups[] = [];
  public lastYearAccounts: IChildGroups[] = [];
  public companyData$: Observable<{ companies: CompanyResponse[], uniqueName: string }>
  public expensesChartData$: Observable<IExpensesChartClosingBalanceResponse>;
  public accountStrings: AccountChartDataLastCurrentYear[] = [];
  public activeYearAccountsRanks: ObservableArray<any> = new ObservableArray([]);
  public lastYearAccountsRanks: ObservableArray<any> = new ObservableArray([]);
  public activeYearGrandAmount: number = 0;
  public lastYearGrandAmount: number = 0;
  public activePieChartAmount: number = 0;
  public lastPieChartAmount: number = 0;
  public chartFilterType$: Observable<string>;
  public chartFilterTitle: string = 'Custom';
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  constructor(private store: Store<AppState>, private _dashboardActions: DashboardActions, private page: Page) {
    this.expensesChartData$ = this.store.select(p => p.dashboard.expensesChart);
    this.companyData$ = this.store.select(createSelector([(state: AppState) => state.session.companies, (state: AppState) => state.session.companyUniqueName], (companies, uniqueName) => {
      return { companies, uniqueName };
    }));
    this.chartFilterType$ = this.store.select(p => p.dashboard.expensesChartFilter);
    this.page.on(Page.unloadedEvent, ev => this.ngOnDestroy());
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

    this.expensesChartData$.subscribe(exp => {
      // if (exp) {
      if (exp && exp.operatingcostActiveyear && exp.indirectexpensesActiveyear) {
        let indirectexpensesGroups = [].concat.apply([], exp.indirectexpensesActiveyear.childGroups);
        let operatingcostGroups = [].concat.apply([], exp.operatingcostActiveyear.childGroups);
        let accounts = _.unionBy(indirectexpensesGroups as IChildGroups[], operatingcostGroups as IChildGroups[]) as IChildGroups[];
        this.activeYearAccounts = accounts;
      } else {
        this.resetActiveYearChartData();
      }

      if (exp && exp.operatingcostLastyear && exp.indirectexpensesLastyear) {
        let indirectexpensesGroups = [].concat.apply([], exp.indirectexpensesLastyear.childGroups);
        let operatingcostGroups = [].concat.apply([], exp.operatingcostLastyear.childGroups);
        let lastAccounts = _.unionBy(indirectexpensesGroups as IChildGroups[], operatingcostGroups as IChildGroups[]) as IChildGroups[];
        this.lastYearAccounts = lastAccounts;
      } else {
        this.resetLastYearChartData();
      }
      // }
      this.generateCharts();
      this.requestInFlight = false;
    });

    this.chartFilterType$.subscribe(p => {
      if (p) {
        let dates = this.parseDates(p);
        this.requestInFlight = true;
        this.store.dispatch(this._dashboardActions.getExpensesChartDataActiveYear(dates.activeYear.startDate, dates.activeYear.endDate, false));
        this.store.dispatch(this._dashboardActions.getExpensesChartDataLastYear(dates.lastYear.startDate, dates.lastYear.endDate, false));
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
    this.store.dispatch(this._dashboardActions.getExpensesChartDataActiveYear(this.activeFinancialYear.financialYearStarts, this.activeFinancialYear.financialYearEnds, false));

    if (this.lastFinancialYear) {
      this.store.dispatch(this._dashboardActions.getExpensesChartDataLastYear(this.lastFinancialYear.financialYearStarts, this.lastFinancialYear.financialYearEnds, false));
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

  public parseDates(filterType: string): ChartFilterConfigs {
    let config = new ChartFilterConfigs();
    switch (filterType) {
      case '1': // This Month to Date
        this.chartFilterTitle = 'This Month to Date';
        config.activeYear.startDate = moment().startOf('month').format('DD-MM-YYYY');
        config.activeYear.endDate = moment().format('DD-MM-YYYY');

        config.lastYear.startDate = moment(config.activeYear.startDate, 'DD-MM-YYYY').subtract(1, 'month').format('DD-MM-YYYY');
        config.lastYear.endDate = moment(config.activeYear.endDate, 'DD-MM-YYYY').endOf('month').subtract(1, 'month').format('DD-MM-YYYY');
        return config;
      case '2': // This Quarter to Date
        this.chartFilterTitle = 'This Quarter to Date';
        config.activeYear.startDate = moment().quarter(moment().quarter()).startOf('quarter').format('DD-MM-YYYY');
        config.activeYear.endDate = moment().format('DD-MM-YYYY');

        config.lastYear.startDate = moment(config.activeYear.startDate, 'DD-MM-YYYY').quarter(moment().quarter()).startOf('quarter').subtract(1, 'quarter').format('DD-MM-YYYY');
        config.lastYear.endDate = moment(config.activeYear.startDate, 'DD-MM-YYYY').quarter(moment().quarter()).endOf('quarter').subtract(1, 'quarter').format('DD-MM-YYYY');
        return config;
      case '3': // This Financial Year to Date
        this.chartFilterTitle = 'This Financial Year to Date';
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
        this.chartFilterTitle = 'This Year to Date';
        config.activeYear.startDate = moment().startOf('year').format('DD-MM-YYYY');
        config.activeYear.endDate = moment().format('DD-MM-YYYY');

        config.lastYear.startDate = moment(config.activeYear.startDate, 'DD-MM-YYYY').subtract(1, 'year').format('DD-MM-YYYY');
        config.lastYear.endDate = moment(config.activeYear.endDate, 'DD-MM-YYYY').endOf('year').subtract(1, 'year').format('DD-MM-YYYY');
        return config;
      case '5': // Last Month
        this.chartFilterTitle = 'Last Month';
        config.activeYear.startDate = moment().startOf('month').subtract(1, 'month').format('DD-MM-YYYY');
        config.activeYear.endDate = moment().endOf('month').subtract(1, 'month').format('DD-MM-YYYY');

        config.lastYear.startDate = moment(config.activeYear.startDate, 'DD-MM-YYYY').startOf('month').subtract(1, 'month').format('DD-MM-YYYY');
        config.lastYear.endDate = moment(config.activeYear.endDate, 'DD-MM-YYYY').endOf('month').subtract(1, 'month').format('DD-MM-YYYY');
        return config;
      case '6': // Last Quater
        this.chartFilterTitle = 'Last Quater';
        config.activeYear.startDate = moment().quarter(moment().quarter()).startOf('quarter').subtract(1, 'quarter').format('DD-MM-YYYY');
        config.activeYear.endDate = moment().quarter(moment().quarter()).endOf('quarter').subtract(1, 'quarter').format('DD-MM-YYYY');

        config.lastYear.startDate = moment().quarter(moment(config.activeYear.startDate, 'DD-MM-YYYY').quarter()).startOf('quarter').subtract(1, 'quarter').format('DD-MM-YYYY');
        config.lastYear.endDate = moment().quarter(moment(config.activeYear.startDate, 'DD-MM-YYYY').quarter()).endOf('quarter').subtract(1, 'quarter').format('DD-MM-YYYY');
        return config;
      case '7': // Last Fiancial Year
        this.chartFilterTitle = 'Last Fiancial Year';
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
        this.chartFilterTitle = 'Last Year';
        config.activeYear.startDate = moment().startOf('year').subtract(1, 'year').format('DD-MM-YYYY');
        config.activeYear.endDate = moment().endOf('year').subtract(1, 'year').format('DD-MM-YYYY');

        config.lastYear.startDate = moment(config.activeYear.startDate, 'DD-MM-YYYY').startOf('year').subtract(1, 'year').format('DD-MM-YYYY');
        config.lastYear.endDate = moment(config.activeYear.endDate, 'DD-MM-YYYY').endOf('year').subtract(1, 'year').format('DD-MM-YYYY');
        return config;
      case '9':
        this.chartFilterTitle = 'Custom';
        return config;
      default:
        return config;
    }
  }

  public ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}

import { Component, OnInit } from '@angular/core';
import { ActiveFinancialYear, CompanyResponse } from '~/models/api-models/Company';
<<<<<<< HEAD
import { IChildGroups, IExpensesChartClosingBalanceResponse, ChartFilterType } from '~/models/interfaces/dashboard.interface';
=======
import { IChildGroups, IExpensesChartClosingBalanceResponse, ChartFilterType, ChartType } from '~/models/interfaces/dashboard.interface';
>>>>>>> 66f5b58428db7ba9539d52a075cf810b2f929b7d
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
  public chartType: ChartType = ChartType.Expense;
  public requestInFlight: boolean;
  public activeYearAccounts: IChildGroups[] = [];
  public lastYearAccounts: IChildGroups[] = [];
  public expensesChartData$: Observable<IExpensesChartClosingBalanceResponse>;
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
    this.expensesChartData$ = this.store.select(p => p.dashboard.expensesChart).takeUntil(this.destroyed$);

    this.chartFilterType$ = this.store.select(p => p.dashboard.expensesChartFilter).takeUntil(this.destroyed$);
    this.page.on(Page.unloadedEvent, ev => this.ngOnDestroy());
  }

  ngOnInit() {
    this.fetchChartData();
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
      if (exp && exp.chartTitle) {
        this.chartFilterTitle = exp.chartTitle;
      }

      if (exp && exp.lable) {
        this.activeYearChartFormatedDate = exp.lable.activeYearLabel || '';
        this.lastYearChartFormatedDate = exp.lable.lastYearLabel || '';
      }
      // }
      this.generateCharts();
      this.requestInFlight = false;
    });
<<<<<<< HEAD

    this.chartFilterType$.subscribe(p => {
      if (p) {
        let dates = this.parseDates(p, this.activeFinancialYear, this.lastFinancialYear);
        this.requestInFlight = true;
        this.store.dispatch(this._dashboardActions.getExpensesChartDataActiveYear(dates.activeYear.startDate, dates.activeYear.endDate, false));
        this.store.dispatch(this._dashboardActions.getExpensesChartDataLastYear(dates.lastYear.startDate, dates.lastYear.endDate, false));
      }
    });
=======
>>>>>>> 66f5b58428db7ba9539d52a075cf810b2f929b7d
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

<<<<<<< HEAD
  public parseDates(filterType: ChartFilterType, activeFinancialYear: ActiveFinancialYear, lastFinancialYear: ActiveFinancialYear): ChartFilterConfigs {
    let config = new ChartFilterConfigs();
    switch (filterType) {
      case ChartFilterType.ThisMonthToDate: // This Month to Date
        config.ChartTitle = 'This Month to Date';
        config.activeYear.startDate = moment().startOf('month').format('DD-MM-YYYY');
        config.activeYear.endDate = moment().format('DD-MM-YYYY');
        config.activeYear.lable = moment().format('MMM/YY')

        config.lastYear.startDate = moment(config.activeYear.startDate, 'DD-MM-YYYY').subtract(1, 'month').format('DD-MM-YYYY');
        config.lastYear.endDate = moment(config.activeYear.endDate, 'DD-MM-YYYY').endOf('month').subtract(1, 'month').format('DD-MM-YYYY');
        config.lastYear.lable = moment(config.activeYear.startDate, 'DD-MM-YYYY').subtract(1, 'month').format('MMM/YY')
        return config;
      case ChartFilterType.ThisQuarterToDate: // This Quarter to Date
        config.ChartTitle = 'This Quarter to Date';
        config.activeYear.startDate = moment().quarter(moment().quarter()).startOf('quarter').format('DD-MM-YYYY');
        config.activeYear.endDate = moment().format('DD-MM-YYYY');
        config.activeYear.lable = 'Q' + moment().quarter();

        config.lastYear.startDate = moment(config.activeYear.startDate, 'DD-MM-YYYY').quarter(moment().quarter()).startOf('quarter').subtract(1, 'quarter').format('DD-MM-YYYY');
        config.lastYear.endDate = moment(config.activeYear.startDate, 'DD-MM-YYYY').quarter(moment().quarter()).endOf('quarter').subtract(1, 'quarter').format('DD-MM-YYYY');
        config.lastYear.lable = 'Q' + moment(config.activeYear.startDate, 'DD-MM-YYYY').quarter(moment().quarter()).endOf('quarter').subtract(1, 'quarter').quarter();
        return config;
      case ChartFilterType.ThisFinancialYearToDate: // This Financial Year to Date
        config.ChartTitle = 'This Financial Year to Date';
        if (activeFinancialYear) {
          config.activeYear.startDate = moment(activeFinancialYear.financialYearStarts, 'DD-MM-YYYY').startOf('day').format('DD-MM-YYYY');
          config.activeYear.endDate = moment(activeFinancialYear.financialYearEnds, 'DD-MM-YYYY').endOf('day').format('DD-MM-YYYY');
          config.activeYear.lable = 'FY-' + moment(activeFinancialYear.financialYearStarts, 'DD-MM-YYYY').startOf('day').format('YY') + ' - FY-' + moment(activeFinancialYear.financialYearEnds, 'DD-MM-YYYY').endOf('day').format('YY');
        } else {
          config.activeYear.startDate = '00-00-0000';
          config.activeYear.endDate = '00-00-0000';
        }

        if (lastFinancialYear) {
          config.lastYear.startDate = moment(lastFinancialYear.financialYearStarts, 'DD-MM-YYYY').subtract(1, 'year').startOf('day').format('DD-MM-YYYY');
          config.lastYear.endDate = moment(lastFinancialYear.financialYearEnds, 'DD-MM-YYYY').endOf('day').subtract(1, 'year').format('DD-MM-YYYY');
          config.lastYear.lable = 'FY-' + moment(lastFinancialYear.financialYearStarts, 'DD-MM-YYYY').startOf('day').format('YY') + ' - FY-' + moment(lastFinancialYear.financialYearEnds, 'DD-MM-YYYY').endOf('day').format('YY');
        } else {
          config.lastYear.startDate = '00-00-0000';
          config.lastYear.endDate = '00-00-0000';
        }
        return config;
      case ChartFilterType.ThisYearToDate: // This Year to Date
        config.ChartTitle = 'This Year to Date';
        config.activeYear.startDate = moment().startOf('year').format('DD-MM-YYYY');
        config.activeYear.endDate = moment().format('DD-MM-YYYY');
        config.activeYear.lable = moment().format('YYYY');

        config.lastYear.startDate = moment(config.activeYear.startDate, 'DD-MM-YYYY').subtract(1, 'year').format('DD-MM-YYYY');
        config.lastYear.endDate = moment(config.activeYear.endDate, 'DD-MM-YYYY').endOf('year').subtract(1, 'year').format('DD-MM-YYYY');
        config.lastYear.lable = moment(config.activeYear.startDate, 'DD-MM-YYYY').subtract(1, 'year').format('YYYY')
        return config;
      case ChartFilterType.LastMonth: // Last Month
        config.ChartTitle = 'Last Month';
        config.activeYear.startDate = moment().startOf('month').subtract(1, 'month').format('DD-MM-YYYY');
        config.activeYear.endDate = moment().endOf('month').subtract(1, 'month').format('DD-MM-YYYY');
        config.activeYear.lable = moment().startOf('month').subtract(1, 'month').format('MMM/YY')

        config.lastYear.startDate = moment(config.activeYear.startDate, 'DD-MM-YYYY').startOf('month').subtract(1, 'month').format('DD-MM-YYYY');
        config.lastYear.endDate = moment(config.activeYear.endDate, 'DD-MM-YYYY').endOf('month').subtract(1, 'month').format('DD-MM-YYYY');
        config.lastYear.lable = moment(config.activeYear.endDate, 'DD-MM-YYYY').endOf('month').subtract(1, 'month').format('MMM/YY')
        return config;
      case ChartFilterType.LastQuater: // Last Quater
        config.ChartTitle = 'Last Quater';
        config.activeYear.startDate = moment().quarter(moment().quarter()).startOf('quarter').subtract(1, 'quarter').format('DD-MM-YYYY');
        config.activeYear.endDate = moment().quarter(moment().quarter()).endOf('quarter').subtract(1, 'quarter').format('DD-MM-YYYY');
        config.activeYear.lable = 'Q' + moment().quarter(moment().quarter()).startOf('quarter').subtract(1, 'quarter').quarter();

        config.lastYear.startDate = moment().quarter(moment(config.activeYear.startDate, 'DD-MM-YYYY').quarter()).startOf('quarter').subtract(1, 'quarter').format('DD-MM-YYYY');
        config.lastYear.endDate = moment().quarter(moment(config.activeYear.startDate, 'DD-MM-YYYY').quarter()).endOf('quarter').subtract(1, 'quarter').format('DD-MM-YYYY');
        config.lastYear.lable = 'Q' + moment().quarter(moment(config.activeYear.startDate, 'DD-MM-YYYY').quarter()).endOf('quarter').subtract(1, 'quarter').quarter();
        return config;
      case ChartFilterType.LastFiancialYear: // Last Fiancial Year
        config.ChartTitle = 'Last Fiancial Year';
        if (activeFinancialYear) {
          config.activeYear.startDate = moment(activeFinancialYear.financialYearStarts, 'DD-MM-YYYY').startOf('day').subtract(1, 'year').format('DD-MM-YYYY');
          config.activeYear.endDate = moment(activeFinancialYear.financialYearStarts, 'DD-MM-YYYY').endOf('day').subtract(1, 'year').format('DD-MM-YYYY');
          config.activeYear.lable = 'FY-' + moment(activeFinancialYear.financialYearStarts, 'DD-MM-YYYY').startOf('day').subtract(1, 'year').format('YY') + ' - FY-' + moment(activeFinancialYear.financialYearEnds, 'DD-MM-YYYY').endOf('day').subtract(1, 'year').format('YY');
        } else {
          config.activeYear.startDate = '00-00-0000';
          config.activeYear.endDate = '00-00-0000';
        }

        if (lastFinancialYear) {
          config.lastYear.startDate = moment(lastFinancialYear.financialYearStarts, 'DD-MM-YYYY').startOf('day').subtract(1, 'year').format('DD-MM-YYYY');
          config.lastYear.endDate = moment(lastFinancialYear.financialYearStarts, 'DD-MM-YYYY').endOf('day').subtract(1, 'year').format('DD-MM-YYYY');
          config.activeYear.lable = 'FY-' + moment(lastFinancialYear.financialYearStarts, 'DD-MM-YYYY').startOf('day').subtract(1, 'year').format('YY') + ' - FY-' + moment(lastFinancialYear.financialYearEnds, 'DD-MM-YYYY').endOf('day').subtract(1, 'year').format('YY');
        } else {
          config.lastYear.startDate = '00-00-0000';
          config.lastYear.endDate = '00-00-0000';
        }
        return config;
      case ChartFilterType.LastYear: // Last Year
        config.ChartTitle = 'Last Year';
        config.activeYear.startDate = moment().startOf('year').subtract(1, 'year').format('DD-MM-YYYY');
        config.activeYear.endDate = moment().endOf('year').subtract(1, 'year').format('DD-MM-YYYY');
        config.activeYear.lable = moment().startOf('year').subtract(1, 'year').format('YYYY');

        config.lastYear.startDate = moment(config.activeYear.startDate, 'DD-MM-YYYY').startOf('year').subtract(1, 'year').format('DD-MM-YYYY');
        config.lastYear.endDate = moment(config.activeYear.endDate, 'DD-MM-YYYY').endOf('year').subtract(1, 'year').format('DD-MM-YYYY');
        config.lastYear.lable = moment(config.activeYear.startDate, 'DD-MM-YYYY').startOf('year').subtract(1, 'year').format('YYYY');
        return config;
      case ChartFilterType.Custom:
        config.ChartTitle = 'Custom';
        return config;
      default:
        return config;
    }
  }

=======
>>>>>>> 66f5b58428db7ba9539d52a075cf810b2f929b7d
  public ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}

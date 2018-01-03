import { Actions, Effect } from "@ngrx/effects";
import { DashboardService } from "~/services/dashboard.service";
import { DashboardConst } from "~/actions/dashboard/dashboard.const";
import { CustomActions } from "~/store/customActions";
import { Observable } from "rxjs/Observable";
import { IRevenueChartClosingBalanceResponse, IExpensesChartClosingBalanceResponse, ChartFilterType, ChartType } from "~/models/interfaces/dashboard.interface";
import { Injectable } from "@angular/core";
import { zip } from "rxjs/observable/zip";
import * as dialogs from "ui/dialogs";
import * as _ from 'lodash';
import * as moment from 'moment/moment';
import { ChartFilterConfigs } from "~/models/api-models/Dashboard";
import { ActiveFinancialYear } from "~/models/api-models/Company";
import { AppState } from "~/store";
import { Store, createSelector } from "@ngrx/store";

import { of } from "rxjs/observable/of";

@Injectable()
export class DashboardActions {
  @Effect()
  public GetExpensesChartActiveYear$: Observable<CustomActions> = this.actions$
    .ofType(DashboardConst.EXPENSES_CHART.GET_EXPENSES_CHART_DATA_ACTIVE_YEAR)
    .switchMap((action: CustomActions) => {
      let filterType: ChartFilterType;
      let activeFinancialYear: ActiveFinancialYear;
      let lastFinancialYear: ActiveFinancialYear;
      this.store.select(s => s.dashboard.expensesChartFilter).take(1).subscribe(p => filterType = p);
      this.store.select(createSelector([(state: AppState) => state.session.companies, (state: AppState) => state.session.companyUniqueName], (companies, uniqueName) => {
        return { companies, uniqueName };
      })).take(1).subscribe(res => {
        if (!res.companies) {
          return;
        }
        let financialYears = [];
        let activeCmp = res.companies.find(p => p.uniqueName === res.uniqueName);
        if (activeCmp) {
          activeFinancialYear = activeCmp.activeFinancialYear;

          if (activeCmp.financialYears.length > 1) {
            financialYears = activeCmp.financialYears.filter(cm => cm.uniqueName !== activeFinancialYear.uniqueName);
            financialYears = _.filter(financialYears, (it: ActiveFinancialYear) => {
              let a = moment(activeFinancialYear.financialYearStarts, 'DD-MM-YYYY');
              let b = moment(it.financialYearEnds, 'DD-MM-YYYY');

              return b.diff(a, 'days') < 0;
            });
            financialYears = _.orderBy(financialYears, (p: ActiveFinancialYear) => {
              let a = moment(activeFinancialYear.financialYearStarts, 'DD-MM-YYYY');
              let b = moment(p.financialYearEnds, 'DD-MM-YYYY');
              return b.diff(a, 'days');
            }, 'desc');
            lastFinancialYear = financialYears[0];
          }
        }
      });
      let op = parseDates(filterType, activeFinancialYear, lastFinancialYear)
      return zip(
        this._dashboardService.GetClosingBalance('operatingcost', action.payload.fromDate, action.payload.toDate, action.payload.refresh),
        this._dashboardService.GetClosingBalance('indirectexpenses', action.payload.fromDate, action.payload.toDate, action.payload.refresh),
        of(op)
      );
    }).map((res) => {
      if (res[0].status === 'success' && res[1].status === 'success') {
        let obj: IExpensesChartClosingBalanceResponse = {
          operatingcostActiveyear: res[0].body[0],
          indirectexpensesActiveyear: res[1].body[0],
          lable: { activeYearLabel: res[2].activeYear.lable },
          chartTitle: res[2].ChartTitle
        };
        return {
          type: DashboardConst.EXPENSES_CHART.GET_EXPENSES_CHART_DATA_ACTIVE_YEAR_RESPONSE,
          payload: obj
        };
      }
      return {
        type: DashboardConst.EXPENSES_CHART.GET_EXPENSES_CHART_DATA_ACTIVE_YEAR_ERROR_RESPONSE
      };
    });

  @Effect()
  public GetExpensesChartLastYear$: Observable<CustomActions> = this.actions$
    .ofType(DashboardConst.EXPENSES_CHART.GET_EXPENSES_CHART_DATA_LAST_YEAR)
    .switchMap((action: CustomActions) => {
      let filterType: ChartFilterType;
      let activeFinancialYear: ActiveFinancialYear;
      let lastFinancialYear: ActiveFinancialYear;
      this.store.select(p => p.dashboard.revenueChartFilter).take(1).subscribe(p => filterType = p);
      this.store.select(createSelector([(state: AppState) => state.session.companies, (state: AppState) => state.session.companyUniqueName], (companies, uniqueName) => {
        return { companies, uniqueName };
      })).take(1).subscribe(res => {
        if (!res.companies) {
          return;
        }
        let financialYears = [];
        let activeCmp = res.companies.find(p => p.uniqueName === res.uniqueName);
        if (activeCmp) {
          activeFinancialYear = activeCmp.activeFinancialYear;

          if (activeCmp.financialYears.length > 1) {
            financialYears = activeCmp.financialYears.filter(cm => cm.uniqueName !== activeFinancialYear.uniqueName);
            financialYears = _.filter(financialYears, (it: ActiveFinancialYear) => {
              let a = moment(activeFinancialYear.financialYearStarts, 'DD-MM-YYYY');
              let b = moment(it.financialYearEnds, 'DD-MM-YYYY');

              return b.diff(a, 'days') < 0;
            });
            financialYears = _.orderBy(financialYears, (p: ActiveFinancialYear) => {
              let a = moment(activeFinancialYear.financialYearStarts, 'DD-MM-YYYY');
              let b = moment(p.financialYearEnds, 'DD-MM-YYYY');
              return b.diff(a, 'days');
            }, 'desc');
            lastFinancialYear = financialYears[0];
          }
        }
      });
      let op = parseDates(filterType, activeFinancialYear, lastFinancialYear)
      return zip(
        this._dashboardService.GetClosingBalance('operatingcost', action.payload.fromDate, action.payload.toDate, action.payload.refresh),
        this._dashboardService.GetClosingBalance('indirectexpenses', action.payload.fromDate, action.payload.toDate, action.payload.refresh),
        of(op)
      );
    }).map((res) => {
      if (res[0].status === 'success' && res[1].status === 'success') {
        let obj: IExpensesChartClosingBalanceResponse = {
          operatingcostLastyear: res[0].body[0],
          indirectexpensesLastyear: res[1].body[0],
          lable: { activeYearLabel: res[2].lastYear.lable },
          chartTitle: res[2].ChartTitle
        };
        return {
          type: DashboardConst.EXPENSES_CHART.GET_EXPENSES_CHART_DATA_LAST_YEAR_RESPONSE,
          payload: obj
        };
      }
      return {
        type: DashboardConst.EXPENSES_CHART.GET_EXPENSES_CHART_DATA_ACTIVE_YEAR_ERROR_RESPONSE
      };
    });

  @Effect()
  public GetRevenueChartDataActiveYear$: Observable<CustomActions> = this.actions$
    .ofType(DashboardConst.REVENUE_CHART.GET_REVENUE_CHART_DATA_ACTIVE_YEAR)
    .switchMap((action: CustomActions) => {
      let filterType: ChartFilterType;
      let activeFinancialYear: ActiveFinancialYear;
      let lastFinancialYear: ActiveFinancialYear;
      this.store.select(p => p.dashboard.revenueChartFilter).take(1).subscribe(p => filterType = p);
      console.log('active filter', filterType);
      this.store.select(createSelector([(state: AppState) => state.session.companies, (state: AppState) => state.session.companyUniqueName], (companies, uniqueName) => {
        return { companies, uniqueName };
      })).take(1).subscribe(res => {
        if (!res.companies) {
          return;
        }
        let financialYears = [];
        let activeCmp = res.companies.find(p => p.uniqueName === res.uniqueName);
        if (activeCmp) {
          activeFinancialYear = activeCmp.activeFinancialYear;

          if (activeCmp.financialYears.length > 1) {
            financialYears = activeCmp.financialYears.filter(cm => cm.uniqueName !== activeFinancialYear.uniqueName);
            financialYears = _.filter(financialYears, (it: ActiveFinancialYear) => {
              let a = moment(activeFinancialYear.financialYearStarts, 'DD-MM-YYYY');
              let b = moment(it.financialYearEnds, 'DD-MM-YYYY');

              return b.diff(a, 'days') < 0;
            });
            financialYears = _.orderBy(financialYears, (p: ActiveFinancialYear) => {
              let a = moment(activeFinancialYear.financialYearStarts, 'DD-MM-YYYY');
              let b = moment(p.financialYearEnds, 'DD-MM-YYYY');
              return b.diff(a, 'days');
            }, 'desc');
            lastFinancialYear = financialYears[0];
          }
        }
      });
      let op = parseDates(filterType, activeFinancialYear, lastFinancialYear)
      return zip(
        this._dashboardService.GetClosingBalance('revenuefromoperations', op.activeYear.startDate, op.activeYear.endDate, action.payload.refresh),
        this._dashboardService.GetClosingBalance('otherincome', op.activeYear.startDate, op.activeYear.endDate, action.payload.refresh),
        of(op)
      );
    }).map((res) => {
      console.log('dada', JSON.stringify(res[0].message));
      if (res[0].status === 'success' && res[1].status === 'success') {
        let obj: IRevenueChartClosingBalanceResponse = {
          revenuefromoperationsActiveyear: res[0].body[0],
          otherincomeActiveyear: res[1].body[0],
          lable: { activeYearLabel: res[2].activeYear.lable },
          chartTitle: res[2].ChartTitle
        };
        return {
          type: DashboardConst.REVENUE_CHART.GET_REVENUE_CHART_DATA_ACTIVE_YEAR_RESPONSE,
          payload: obj
        };
      }
      return {
        type: DashboardConst.REVENUE_CHART.GET_REVENUE_CHART_DATA_ERROR_RESPONSE
      };
    });

  @Effect()
  public GetRevenueChartDataLastYear$: Observable<CustomActions> = this.actions$
    .ofType(DashboardConst.REVENUE_CHART.GET_REVENUE_CHART_DATA_LAST_YEAR)
    .switchMap((action: CustomActions) => {
      let filterType: ChartFilterType;
      let activeFinancialYear: ActiveFinancialYear;
      let lastFinancialYear: ActiveFinancialYear;
      this.store.select(p => p.dashboard.revenueChartFilter).take(1).subscribe(p => filterType = p);
      this.store.select(createSelector([(state: AppState) => state.session.companies, (state: AppState) => state.session.companyUniqueName], (companies, uniqueName) => {
        return { companies, uniqueName };
      })).take(1).subscribe(res => {
        if (!res.companies) {
          return;
        }
        let financialYears = [];
        let activeCmp = res.companies.find(p => p.uniqueName === res.uniqueName);
        if (activeCmp) {
          activeFinancialYear = activeCmp.activeFinancialYear;

          if (activeCmp.financialYears.length > 1) {
            financialYears = activeCmp.financialYears.filter(cm => cm.uniqueName !== activeFinancialYear.uniqueName);
            financialYears = _.filter(financialYears, (it: ActiveFinancialYear) => {
              let a = moment(activeFinancialYear.financialYearStarts, 'DD-MM-YYYY');
              let b = moment(it.financialYearEnds, 'DD-MM-YYYY');

              return b.diff(a, 'days') < 0;
            });
            financialYears = _.orderBy(financialYears, (p: ActiveFinancialYear) => {
              let a = moment(activeFinancialYear.financialYearStarts, 'DD-MM-YYYY');
              let b = moment(p.financialYearEnds, 'DD-MM-YYYY');
              return b.diff(a, 'days');
            }, 'desc');
            lastFinancialYear = financialYears[0];
          }
        }
      });
      let op = parseDates(filterType, activeFinancialYear, lastFinancialYear)
      return zip(
        this._dashboardService.GetClosingBalance('revenuefromoperations', op.lastYear.startDate, op.lastYear.endDate, action.payload.refresh),
        this._dashboardService.GetClosingBalance('otherincome', op.lastYear.startDate, op.lastYear.endDate, action.payload.refresh),
        of(op)
      );
    }).map((res) => {
      console.log('lada', JSON.stringify(res[0].message));
      if (res[0].status === 'success' && res[1].status === 'success') {
        let obj: IRevenueChartClosingBalanceResponse = {
          revenuefromoperationsLastyear: res[0].body[0],
          otherincomeLastyear: res[1].body[0],
          lable: { activeYearLabel: res[2].lastYear.lable },
          chartTitle: res[2].ChartTitle
        };
        return {
          type: DashboardConst.REVENUE_CHART.GET_REVENUE_CHART_DATA_LAST_YEAR_RESPONSE,
          payload: obj
        };
      }
      return {
        type: DashboardConst.REVENUE_CHART.GET_REVENUE_CHART_DATA_ERROR_RESPONSE
      };
    });

    constructor(private actions$: Actions, private _dashboardService: DashboardService, private store: Store<AppState>) {

  }

  public getExpensesChartDataActiveYear(refresh: boolean = false): CustomActions {
    return {
      type: DashboardConst.EXPENSES_CHART.GET_EXPENSES_CHART_DATA_ACTIVE_YEAR,
      payload: { refresh }
    };
  }

  public getExpensesChartDataLastYear(refresh: boolean = false): CustomActions {
    return {
      type: DashboardConst.EXPENSES_CHART.GET_EXPENSES_CHART_DATA_LAST_YEAR,
      payload: { refresh }
    };
  }

  public getRevenueChartDataActiveYear(refresh: boolean = false): CustomActions {
    return {
      type: DashboardConst.REVENUE_CHART.GET_REVENUE_CHART_DATA_ACTIVE_YEAR,
      payload: { refresh }
    };
  }

  public getRevenueChartDataLastYear(refresh: boolean = false): CustomActions {
    return {
      type: DashboardConst.REVENUE_CHART.GET_REVENUE_CHART_DATA_LAST_YEAR,
      payload: { refresh }
    };
  }

  public setChartFilter(chartType: ChartType, filterType: ChartFilterType): CustomActions {
    return {
      type: DashboardConst.SET_CHART_FILTER_TYPE,
      payload: { chartType, filterType }
    };
  }
}

const parseDates = (filterType: ChartFilterType, activeFinancialYear: ActiveFinancialYear, lastFinancialYear: ActiveFinancialYear): ChartFilterConfigs => {
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

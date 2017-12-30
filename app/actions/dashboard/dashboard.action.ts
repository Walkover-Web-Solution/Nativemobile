import { Actions, Effect } from "@ngrx/effects";
import { DashboardService } from "~/services/dashboard.service";
import { DashboardConst } from "~/actions/dashboard/dashboard.const";
import { CustomActions } from "~/store/customActions";
import { Observable } from "rxjs/Observable";
import { IRevenueChartClosingBalanceResponse, IExpensesChartClosingBalanceResponse } from "~/models/interfaces/dashboard.interface";
import { Injectable } from "@angular/core";
import { zip } from "rxjs/observable/zip";
import * as dialogs from "ui/dialogs";

@Injectable()
export class DashboardActions {
  @Effect()
  public GetExpensesChartActiveYear$: Observable<CustomActions> = this.actions$
    .ofType(DashboardConst.EXPENSES_CHART.GET_EXPENSES_CHART_DATA_ACTIVE_YEAR)
    .switchMap((action: CustomActions) => {
      return zip(
        this._dashboardService.GetClosingBalance('operatingcost', action.payload.fromDate, action.payload.toDate, action.payload.refresh),
        this._dashboardService.GetClosingBalance('indirectexpenses', action.payload.fromDate, action.payload.toDate, action.payload.refresh)
      );
    }).map((res) => {
      if (res[0].status === 'success' && res[1].status === 'success') {
        let obj: IExpensesChartClosingBalanceResponse = {
          operatingcostActiveyear: res[0].body[0],
          indirectexpensesActiveyear: res[1].body[0]
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
      return zip(
        this._dashboardService.GetClosingBalance('operatingcost', action.payload.fromDate, action.payload.toDate, action.payload.refresh),
        this._dashboardService.GetClosingBalance('indirectexpenses', action.payload.fromDate, action.payload.toDate, action.payload.refresh)
      );
    }).map((res) => {
      if (res[0].status === 'success' && res[1].status === 'success') {
        let obj: IExpensesChartClosingBalanceResponse = {
          operatingcostLastyear: res[0].body[0],
          indirectexpensesLastyear: res[1].body[0]
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
      return zip(
        this._dashboardService.GetClosingBalance('revenuefromoperations', action.payload.fromDate, action.payload.toDate, action.payload.refresh),
        this._dashboardService.GetClosingBalance('otherincome', action.payload.fromDate, action.payload.toDate, action.payload.refresh)
      );
    }).map((res) => {
      console.log('dada', JSON.stringify(res[0].message));
      if (res[0].status === 'success' && res[1].status === 'success') {
        let obj: IRevenueChartClosingBalanceResponse = {
          revenuefromoperationsActiveyear: res[0].body[0],
          otherincomeActiveyear: res[1].body[0]
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
      return zip(
        this._dashboardService.GetClosingBalance('revenuefromoperations', action.payload.fromDate, action.payload.toDate, action.payload.refresh),
        this._dashboardService.GetClosingBalance('otherincome', action.payload.fromDate, action.payload.toDate, action.payload.refresh)
      );
    }).map((res) => {
      console.log('lada', JSON.stringify(res[0].message));
      if (res[0].status === 'success' && res[1].status === 'success') {
        let obj: IRevenueChartClosingBalanceResponse = {
          revenuefromoperationsLastyear: res[0].body[0],
          otherincomeLastyear: res[1].body[0]
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

  constructor(private actions$: Actions, private _dashboardService: DashboardService) {

  }

  public getExpensesChartDataActiveYear(fromDate: string = '', toDate: string = '', refresh: boolean = false): CustomActions {
    return {
      type: DashboardConst.EXPENSES_CHART.GET_EXPENSES_CHART_DATA_ACTIVE_YEAR,
      payload: { fromDate, toDate, refresh }
    };
  }

  public getExpensesChartDataLastYear(fromDate: string = '', toDate: string = '', refresh: boolean = false): CustomActions {
    return {
      type: DashboardConst.EXPENSES_CHART.GET_EXPENSES_CHART_DATA_LAST_YEAR,
      payload: { fromDate, toDate, refresh }
    };
  }

  public getRevenueChartDataActiveYear(fromDate: string = '', toDate: string = '', refresh: boolean = false): CustomActions {
    return {
      type: DashboardConst.REVENUE_CHART.GET_REVENUE_CHART_DATA_ACTIVE_YEAR,
      payload: { fromDate, toDate, refresh }
    };
  }

  public getRevenueChartDataLastYear(fromDate: string = '', toDate: string = '', refresh: boolean = false): CustomActions {
    return {
      type: DashboardConst.REVENUE_CHART.GET_REVENUE_CHART_DATA_LAST_YEAR,
      payload: { fromDate, toDate, refresh }
    };
  }

  public setChartFilter(chartType: string, filterType: string) {
    return {
      type: DashboardConst.SET_CHART_FILTER_TYPE,
      payload: { chartType, filterType }
    };
  }
}

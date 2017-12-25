import { Actions, Effect } from "@ngrx/effects";
import { DashboardService } from "~/services/dashboard.service";
import { DashboardConst } from "~/actions/dashboard/dashboard.const";
import { CustomActions } from "~/store/customActions";
import { Observable } from "rxjs/Observable";
import { IRevenueChartClosingBalanceResponse, IExpensesChartClosingBalanceResponse } from "~/models/interfaces/dashboard.interface";
import { Injectable } from "@angular/core";
import { zip } from "rxjs/observable/zip";

@Injectable()
export class DashboardActions {
  @Effect()
  public GetExpensesChart$: Observable<CustomActions> = this.actions$
    .ofType(DashboardConst.EXPENSES_CHART.GET_EXPENSES_CHART_DATA)
    .switchMap((action: CustomActions) => {
      return zip(
        this._dashboardService.GetClosingBalance('operatingcost', action.payload.fromDate, action.payload.toDate, action.payload.refresh),
        this._dashboardService.GetClosingBalance('indirectexpenses', action.payload.fromDate, action.payload.toDate, action.payload.refresh)
      );
    }).map((res) => {
      if (res[0].status === 'success' && res[1].status === 'success') {
        let obj: IExpensesChartClosingBalanceResponse = {
          operatingcostData: res[0].body[0],
          indirectexpensesData: res[1].body[0]
        };
        return {
          type: DashboardConst.EXPENSES_CHART.GET_EXPENSES_CHART_DATA_RESPONSE,
          payload: obj
        };
      }
      return {
        type: DashboardConst.EXPENSES_CHART.GET_EXPENSES_CHART_DATA_ERROR_RESPONSE,
        payload: { operatingcostData: res[0], indirectexpensesData: res[1] }
      };
    });
  @Effect()
  public GetRevenueChartData$: Observable<CustomActions> = this.actions$
    .ofType(DashboardConst.REVENUE_CHART.GET_REVENUE_CHART_DATA)
    .switchMap((action: CustomActions) => {
      return zip(
        this._dashboardService.GetClosingBalance('revenuefromoperations', action.payload.fromDate, action.payload.toDate, action.payload.refresh),
        this._dashboardService.GetClosingBalance('otherincome', action.payload.fromDate, action.payload.toDate, action.payload.refresh)
      );
    }).map((res) => {
      if (res[0].status === 'success' && res[1].status === 'success') {
        let obj: IRevenueChartClosingBalanceResponse = {
          revenuefromoperationsData: res[0].body[0],
          otherincomeData: res[1].body[0]
        };
        return {
          type: DashboardConst.REVENUE_CHART.GET_REVENUE_CHART_DATA_RESPONSE,
          payload: obj
        };
      }
      return {
        type: DashboardConst.REVENUE_CHART.GET_REVENUE_CHART_DATA_ERROR_RESPONSE,
        payload: { revenuefromoperationsActiveyear: res[0], otherincomeActiveyear: res[1] }
      };
    });

  constructor(private actions$: Actions, private _dashboardService: DashboardService) {

  }

  public getExpensesChartData(fromDate: string = '', toDate: string = '', refresh: boolean = false): CustomActions {
    return {
      type: DashboardConst.EXPENSES_CHART.GET_EXPENSES_CHART_DATA,
      payload: { fromDate, toDate, refresh }
    };
  }

  public getRevenueChartData(fromDate: string = '', toDate: string = '', refresh: boolean = false): CustomActions {
    return {
      type: DashboardConst.REVENUE_CHART.GET_REVENUE_CHART_DATA,
      payload: { fromDate, toDate, refresh }
    };
  }
}

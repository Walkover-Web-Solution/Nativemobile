import { Actions, Effect } from "@ngrx/effects";
import { DashboardService } from "~/services/dashboard.service";
import { DashboardConst } from "~/actions/dashboard/dashboard.const";
import { CustomActions } from "~/store/customActions";
import { Observable } from "rxjs/Observable";
import { IRevenueChartClosingBalanceResponse } from "~/models/interfaces/dashboard.interface";

export class DashboardActions {

  @Effect()
  public GetRevenueChartActiveYear$: Observable<CustomActions> = this.actions$
    .ofType(DashboardConst.REVENUE_CHART.GET_REVENUE_CHART_DATA)
    .switchMap((action: CustomActions) => {
      return Observable.zip(
        this._dashboardService.GetClosingBalance('revenuefromoperations', action.payload.fromDate, action.payload.toDate, action.payload.refresh),
        this._dashboardService.GetClosingBalance('otherincome', action.payload.fromDate, action.payload.toDate, action.payload.refresh)
      );
    }).map((res) => {
      if (res[0].status === 'success' && res[1].status === 'success') {
        let obj: IRevenueChartClosingBalanceResponse = {
          revenuefromoperationsActiveyear: res[0].body[0],
          otherincomeActiveyear: res[1].body[0]
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

import {CustomActions} from "~/store/customActions";
import {ChartFilterType, IProfitLossChartResponse} from "~/models/interfaces/dashboard.interface";
import {ReportConst} from "~/actions/reports/reports.const";
import {DashboardConst} from "~/actions/dashboard/dashboard.const";

export interface ReportState {
  profitLossChart: IProfitLossChartResponse;
  profitLossChartFilter: ChartFilterType;
}

const initialState: ReportState = {
  profitLossChart: {
    chartTitle: '', lable: {activeYearLabel: '', lastYearLabel: ''},
    profitLossActiveYear: null, profitLossLastYear: null
  },
  profitLossChartFilter: ChartFilterType.ThisMonthToDate
};

export function ReportReducer(state: ReportState = initialState, action: CustomActions): ReportState {
  switch (action.type) {

    //region ProfitLoss Chart Data
    case ReportConst.PROFIT_LOSS_CHART.GET_PROFIT_LOSS_CHART_DATA_ACTIVE_YEAR_RESPONSE: {
      let data = action.payload as IProfitLossChartResponse;
      return Object.assign({}, state, {
        profitLossChart: Object.assign({}, state.profitLossChart, {
          profitLossActiveYear: data.profitLossActiveYear,
          chartTitle: data.chartTitle,
          lable: Object.assign({}, state.profitLossChart.lable, {
            activeYearLabel: data.lable.activeYearLabel
          })
        })
      });
    }

    case DashboardConst.EXPENSES_CHART.GET_EXPENSES_CHART_DATA_ACTIVE_YEAR_ERROR_RESPONSE: {
      return Object.assign({}, state, {
        profitLossChart: {
          chartTitle: '', lable: {activeYearLabel: '', lastYearLabel: ''}, profitLossActiveYear: null,
          profitLossLastYear: null
        },
      })
    }

    case DashboardConst.EXPENSES_CHART.GET_EXPENSES_CHART_DATA_LAST_YEAR_RESPONSE: {
      let data = action.payload as IProfitLossChartResponse;
      return Object.assign({}, state, {
        profitLossChart: Object.assign({}, state.profitLossChart, {
          profitLossLastYear: data.profitLossLastYear,
          chartTitle: data.chartTitle,
          lable: Object.assign({}, state.profitLossChart.lable, {
            lastYearLabel: data.lable.lastYearLabel
          })
        })
      });
    }
    //endregion

    //region Set Filter Type
    case ReportConst.SET_PROFIT_LOSS_CHART_FILTER_TYPE: {
      return Object.assign({}, state, {
        profitLossChartFilter: action.payload
      });
    }
    //endregion
    default:
      return state;
  }
}

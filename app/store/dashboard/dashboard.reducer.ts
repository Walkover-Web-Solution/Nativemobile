import { IExpensesChartClosingBalanceResponse, IRevenueChartClosingBalanceResponse, ChartFilterType, ChartType } from "~/models/interfaces/dashboard.interface";
import { CustomActions } from "~/store/customActions";
import { DashboardConst } from "~/actions/dashboard/dashboard.const";
import * as _ from 'lodash';

export interface DashboardState {
  expensesChart: IExpensesChartClosingBalanceResponse;
  revenueChart: IRevenueChartClosingBalanceResponse;
  expensesChartError: string;
  revenueChartError: string;

  revenueChartFilter: ChartFilterType;
  expensesChartFilter: ChartFilterType;
}

const initialState: DashboardState = {
  expensesChart: {
    chartTitle: '', lable: { activeYearLabel: '', lastYearLabel: '' }, indirectexpensesActiveyear: null,
    indirectexpensesLastyear: null, operatingcostActiveyear: null, operatingcostLastyear: null
  },
  revenueChart: {
    chartTitle: '', lable: { activeYearLabel: '', lastYearLabel: '' }, otherincomeActiveyear: null,
    otherincomeLastyear: null, revenuefromoperationsActiveyear: null, revenuefromoperationsLastyear: null
  },
  expensesChartError: '',
  revenueChartError: '',
  revenueChartFilter: ChartFilterType.ThisMonthToDate,
  expensesChartFilter: ChartFilterType.ThisMonthToDate
}

export function DashboardReducer(state: DashboardState = initialState, action: CustomActions): DashboardState {
  switch (action.type) {
    // revenue chart
    case DashboardConst.REVENUE_CHART.GET_REVENUE_CHART_DATA_ACTIVE_YEAR_RESPONSE: {
      let data = action.payload as IRevenueChartClosingBalanceResponse;
      return Object.assign({}, state, {
        revenueChart: Object.assign({}, state.revenueChart, {
          revenuefromoperationsActiveyear: data.revenuefromoperationsActiveyear,
          otherincomeActiveyear: data.otherincomeActiveyear,
          chartTitle: data.chartTitle,
          lable: {
            ...state.revenueChart.lable,
            activeYearLabel: data.lable.activeYearLabel
          }
        })
      });
    }
    case DashboardConst.REVENUE_CHART.GET_REVENUE_CHART_DATA_ERROR_RESPONSE: {
      return {
        ...state,
        revenueChart: {
          chartTitle: '', lable: { activeYearLabel: '', lastYearLabel: '' }, otherincomeActiveyear: null,
          otherincomeLastyear: null, revenuefromoperationsActiveyear: null, revenuefromoperationsLastyear: null
        }
      }
    }

    case DashboardConst.REVENUE_CHART.GET_REVENUE_CHART_DATA_LAST_YEAR_RESPONSE: {
      let data = action.payload as IRevenueChartClosingBalanceResponse;
      return Object.assign({}, state, {
        revenueChart: Object.assign({}, state.revenueChart, {
          revenuefromoperationsLastyear: data.revenuefromoperationsLastyear,
          otherincomeLastyear: data.otherincomeLastyear,
          chartTitle: data.chartTitle,
          lable: {
            ...state.revenueChart.lable,
            lastYearLabel: data.lable.activeYearLabel
          }
        })
      })
    };

    // revenue chart

    // expenses chart
    case DashboardConst.EXPENSES_CHART.GET_EXPENSES_CHART_DATA_ACTIVE_YEAR_RESPONSE: {
      let data = action.payload as IExpensesChartClosingBalanceResponse;
      return Object.assign({}, state, {
        expensesChart: Object.assign({}, state.expensesChart, {
          operatingcostActiveyear: data.operatingcostActiveyear,
          indirectexpensesActiveyear: data.indirectexpensesActiveyear,
          chartTitle: data.chartTitle,
          label: {
            ...state.expensesChart.lable,
            activeYearLabel: data.lable.activeYearLabel
          }
        })
      });
    }

    case DashboardConst.EXPENSES_CHART.GET_EXPENSES_CHART_DATA_ACTIVE_YEAR_ERROR_RESPONSE: {
      return {
        ...state,
        expensesChart: {
          chartTitle: '', lable: { activeYearLabel: '', lastYearLabel: '' }, indirectexpensesActiveyear: null,
          indirectexpensesLastyear: null, operatingcostActiveyear: null, operatingcostLastyear: null
        },
      }
    }

    case DashboardConst.EXPENSES_CHART.GET_EXPENSES_CHART_DATA_LAST_YEAR_RESPONSE: {
      let data = action.payload as IExpensesChartClosingBalanceResponse;
      return Object.assign({}, state, {
        expensesChart: Object.assign({}, state.expensesChart, {
          operatingcostLastyear: data.operatingcostLastyear,
          indirectexpensesLastyear: data.indirectexpensesLastyear,
          chartTitle: data.chartTitle,
          label: {
            ...state.expensesChart.lable,
            lastYearLabel: data.lable.lastYearLabel
          }
        })
      });
    }
    // expenses chart

    case DashboardConst.SET_CHART_FILTER_TYPE: {
      console.log('sasa', JSON.stringify(action.payload));
      if (action.payload.chartType === ChartType.Revenue) {
        return {
          ...state, revenueChartFilter: action.payload.filterType
        };
      }

      return {
        ...state, expensesChartFilter: action.payload.filterType
      }
    }

    default:
      return state;
  }
}

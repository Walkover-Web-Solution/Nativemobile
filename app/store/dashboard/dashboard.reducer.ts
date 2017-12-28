import { IExpensesChartClosingBalanceResponse, IRevenueChartClosingBalanceResponse } from "~/models/interfaces/dashboard.interface";
import { CustomActions } from "~/store/customActions";
import { DashboardConst } from "~/actions/dashboard/dashboard.const";

export interface DashboardState {
  expensesChart: IExpensesChartClosingBalanceResponse;
  revenueChart: IRevenueChartClosingBalanceResponse;
  expensesChartError: string;
  revenueChartError: string;

  revenueChartFilter: string;
  expensesChartFilter: string;
}

const initialState: DashboardState = {
  expensesChart: null,
  revenueChart: null,
  expensesChartError: '',
  revenueChartError: '',
  revenueChartFilter: '',
  expensesChartFilter: ''
}

export function DashboardReducer(state: DashboardState = initialState, action: CustomActions): DashboardState {
  switch (action.type) {
    // revenue chart
    case DashboardConst.REVENUE_CHART.GET_REVENUE_CHART_DATA_ACTIVE_YEAR_RESPONSE: {
      let data = action.payload as IRevenueChartClosingBalanceResponse;
      return Object.assign({}, state, {
        revenueChart: {
          ...state.revenueChart,
          revenuefromoperationsActiveyear: data.revenuefromoperationsActiveyear,
          otherincomeActiveyear: data.otherincomeActiveyear
        }
      });
    }
    case DashboardConst.REVENUE_CHART.GET_REVENUE_CHART_DATA_ERROR_RESPONSE: {
      return {
        ...state,
        revenueChart: null
      }
    }

    case DashboardConst.REVENUE_CHART.GET_REVENUE_CHART_DATA_LAST_YEAR_RESPONSE: {
      let data = action.payload as IRevenueChartClosingBalanceResponse;
      return Object.assign({}, state, {
        revenueChart: {
          ...state.revenueChart,
          revenuefromoperationsLastyear: data.revenuefromoperationsLastyear,
          otherincomeLastyear: data.otherincomeLastyear
        }
      });
    }

    // revenue chart

    // expenses chart
    case DashboardConst.EXPENSES_CHART.GET_EXPENSES_CHART_DATA_ACTIVE_YEAR_RESPONSE: {
      let data = action.payload as IExpensesChartClosingBalanceResponse;
      return Object.assign({}, state, {
        expensesChart: {
          ...state.expensesChart,
          operatingcostActiveyear: data.operatingcostActiveyear,
          indirectexpensesActiveyear: data.indirectexpensesActiveyear
        }
      });
    }

    case DashboardConst.EXPENSES_CHART.GET_EXPENSES_CHART_DATA_ACTIVE_YEAR_ERROR_RESPONSE: {
      return {
        ...state,
        expensesChart: null
      }
    }

    case DashboardConst.EXPENSES_CHART.GET_EXPENSES_CHART_DATA_LAST_YEAR_RESPONSE: {
      let data = action.payload as IExpensesChartClosingBalanceResponse;
      return Object.assign({}, state, {
        expensesChart: {
          ...state.expensesChart,
          operatingcostLastyear: data.operatingcostLastyear,
          indirectexpensesLastyear: data.indirectexpensesLastyear
        }
      });
    }

    case DashboardConst.SET_CHART_FILTER_TYPE: {
      if (action.payload.chartType === 'revenue') {
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

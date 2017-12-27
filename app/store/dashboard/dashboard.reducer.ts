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
    case DashboardConst.REVENUE_CHART.GET_REVENUE_CHART_DATA_RESPONSE: {
      let data = action.payload as IRevenueChartClosingBalanceResponse;
      return Object.assign({}, state, {
        revenueChart: {
          ...state.revenueChart,
          revenuefromoperationsData: data.revenuefromoperationsData,
          otherincomeData: data.otherincomeData
        }
      });
    }
    case DashboardConst.REVENUE_CHART.GET_REVENUE_CHART_DATA_ERROR_RESPONSE: {
      return {
        ...state,
        revenueChart: null
      }
    }

    // revenue chart

    // expenses chart
    case DashboardConst.EXPENSES_CHART.GET_EXPENSES_CHART_DATA_RESPONSE: {
      let data = action.payload as IExpensesChartClosingBalanceResponse;
      return Object.assign({}, state, {
        expensesChart: {
          ...state.expensesChart,
          operatingcostData: data.operatingcostData,
          indirectexpensesData: data.indirectexpensesData
        }
      });
    }

    case DashboardConst.EXPENSES_CHART.GET_EXPENSES_CHART_DATA_ERROR_RESPONSE: {
      return {
        ...state,
        expensesChart: null
      }
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

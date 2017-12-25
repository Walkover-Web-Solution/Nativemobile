import { IExpensesChartClosingBalanceResponse, IRevenueChartClosingBalanceResponse } from "~/models/interfaces/dashboard.interface";
import { CustomActions } from "~/store/customActions";
import { DashboardConst } from "~/actions/dashboard/dashboard.const";

export interface DashboardState {
  expensesChart: IExpensesChartClosingBalanceResponse;
  revenueChart: IRevenueChartClosingBalanceResponse;
  expensesChartError: string;
  revenueChartError: string;
}

const initialState: DashboardState = {
  expensesChart: null,
  revenueChart: null,
  expensesChartError: '',
  revenueChartError: ''
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
    // case DashboardConst.REVENUE_CHART.GET_REVENUE_CHART_DATA_ERROR_RESPONSE: {
    //   let data = action.payload;
    //   if (data.revenuefromoperationsActiveyear.status !== 'success') {
    //     return Object.assign({}, state, {
    //       revenueChartError: data.revenuefromoperationsActiveyear.message
    //     });
    //   }
    //   if (data.otherincomeActiveyear.status !== 'success') {
    //     return Object.assign({}, state, {
    //       revenueChartError: data.otherincomeActiveyear.message
    //     });
    //   }
    //   return state;
    // }

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

    default:
      return state;
  }
}

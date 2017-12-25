import { IExpensesChartClosingBalanceResponse, IRevenueChartClosingBalanceResponse } from "~/models/interfaces/dashboard.interface";
import { CustomActions } from "~/store/customActions";

export interface DashboardState {
  expensesChart: IExpensesChartClosingBalanceResponse;
  revenueChart: IRevenueChartClosingBalanceResponse;
}

const initialState: DashboardState = {
  expensesChart: null,
  revenueChart: null
}

export function DashboardReducer(state: DashboardState = initialState, action: CustomActions): DashboardState {
  switch (action.type) {
    default:
      return state;
  }
}

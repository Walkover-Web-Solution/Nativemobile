import { CustomActions } from "~/store/customActions";
import { IHistoryChartData } from "~/models/interfaces/dashboard.interface";

export interface NewReportsState {
  incomeData: IHistoryChartData;
  expensesData: IHistoryChartData[];
}

const initialState: NewReportsState = {
  incomeData: null,
  expensesData: []
};

export function NewReportsReducer(state: NewReportsState = initialState, action: CustomActions): NewReportsState {
  return state;
}

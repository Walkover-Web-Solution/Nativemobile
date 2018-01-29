import {CustomActions} from "~/store/customActions";
import {ChartFilterType, IProfitLossChartResponse} from "~/models/interfaces/dashboard.interface";
import {ReportConst} from "~/actions/reports/reports.const";
import {ProfitLossData} from "~/models/api-models/tb-pl-bs";
import * as _ from 'lodash';

interface PlState {
  data?: ProfitLossData;
  showLoader: boolean;
  noData: boolean;
}

export interface ReportState {
  profitLossChart: IProfitLossChartResponse;
  profitLossChartFilter: ChartFilterType;
  profitLossSheet: PlState
}

const initialState: ReportState = {
  profitLossChart: {
    chartTitle: '', lable: {activeYearLabel: '', lastYearLabel: ''},
    profitLossActiveYear: null, profitLossLastYear: null
  },
  profitLossChartFilter: ChartFilterType.LastMonth,
  profitLossSheet: {
    data: null,
    noData: true,
    showLoader: false
  }

};

export function ReportReducer(state: ReportState = initialState, action: CustomActions): ReportState {
  switch (action.type) {

    //region ProfitLoss Chart Data
    case ReportConst.PROFIT_LOSS_CHART.GET_PROFIT_LOSS_CHART_DATA_ACTIVE_YEAR_RESPONSE: {
      let data = action.payload as IProfitLossChartResponse;
      return Object.assign({}, state, {
        profitLossChart: Object.assign({}, state.profitLossChart, {
          profitLossActiveYear: processProfitLossChartData(data.profitLossActiveYear),
          chartTitle: data.chartTitle,
          lable: Object.assign({}, state.profitLossChart.lable, {
            activeYearLabel: data.lable.activeYearLabel
          })
        })
      });
    }

    case ReportConst.PROFIT_LOSS_CHART.GET_PROFIT_LOSS_CHART_DATA_ACTIVE_YEAR_ERROR_RESPONSE: {
      return Object.assign({}, state, {
        profitLossChart: {
          chartTitle: '', lable: {activeYearLabel: '', lastYearLabel: ''}, profitLossActiveYear: null,
          profitLossLastYear: null
        },
      })
    }

    case ReportConst.PROFIT_LOSS_CHART.GET_PROFIT_LOSS_CHART_DATA_LAST_YEAR_RESPONSE: {
      let data = action.payload as IProfitLossChartResponse;
      return Object.assign({}, state, {
        profitLossChart: Object.assign({}, state.profitLossChart, {
          profitLossLastYear: processProfitLossChartData(data.profitLossLastYear),
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
    // region ProfitLoss Sheet Data
    case ReportConst.PROFIT_LOSS_SHEET.GET_PROFIT_LOSS_SHEET_REQUEST: {
      let from = action.payload.from;
      let to = action.payload.to;
      return Object.assign({}, state, {
        profitLossSheet: Object.assign({}, state.profitLossSheet, {
          showLoader: true,
          data: Object.assign({}, state, state.profitLossSheet.data, {
            dates: {from, to}
          })
        })
      });
    }
    case ReportConst.PROFIT_LOSS_SHEET.GET_PROFIT_LOSS_SHEET_RESPONSE: {
      let data: ProfitLossData = prepareProfitLossSheetData(_.cloneDeep(action.payload.body));
      data.dates = _.cloneDeep(state.profitLossSheet.data.dates);
      return Object.assign({}, state, {
        profitLossSheet: Object.assign({}, state.profitLossSheet, {
          showLoader: false,
          data
        })
      });
    }
    // endregion
    default:
      return state;
  }
}

const processProfitLossChartData = (plData) => {
  let monthlyBalances = [];
  if (plData && plData.periodBalances) {
    plData.periodBalances.forEach(pb => {
      monthlyBalances.push(pb.monthlyBalance);
    });
  }
  return monthlyBalances;
};

const prepareProfitLossSheetData = (data) => {
  let plData: ProfitLossData = filterProfitLossSheetData(data.groupDetails);
  plData.expenseTotal = calculateTotalExpense(plData.expArr);
  plData.expenseTotalEnd = calculateTotalExpenseEnd(plData.expArr);
  plData.incomeTotal = calculateTotalIncome(plData.incArr);
  plData.incomeTotalEnd = calculateTotalIncomeEnd(plData.incArr);
  plData.closingBalance = Math.abs(plData.incomeTotal - plData.expenseTotal);
  plData.frowardBalance = Math.abs(plData.incomeTotalEnd - plData.expenseTotalEnd);
  if (plData.incomeTotal >= plData.expenseTotal) {
    plData.inProfit = true;
    // plData.expenseTotal += plData.closingBalance;
  }
  if (plData.incomeTotal < plData.expenseTotal) {
    plData.inProfit = false;
    // plData.incomeTotal += plData.closingBalance;
  }
  if (data.closingBalance.type === 'CREDIT') {
    plData.closingBalanceClass = true;
  } else {
    plData.closingBalanceClass = false;
  }
  if (data.forwardedBalance.type === 'CREDIT') {
    plData.frowardBalanceClass = true;
  } else {
    plData.frowardBalanceClass = false;
  }
  return plData;
};

const calculateTotalIncome = data => {
  let eTtl;
  eTtl = 0;
  _.each(data, (item: any) => {
    if (item.closingBalance.type === 'DEBIT') {
      return eTtl -= Number(item.closingBalance.amount);
    } else {
      return eTtl += Number(item.closingBalance.amount);
    }
  });
  return Number(eTtl.toFixed(2));
};
const calculateTotalIncomeEnd = data => {
  let eTtl;
  eTtl = 0;
  _.each(data, (item: any) => {
    if (item.forwardedBalance.type === 'DEBIT') {
      return eTtl -= Number(item.forwardedBalance.amount);
    } else {
      return eTtl += Number(item.forwardedBalance.amount);
    }
  });
  return Number(eTtl.toFixed(2));
};

const calculateTotalExpense = data => {
  let eTtl;
  eTtl = 0;
  _.each(data, (item: any) => {
    if (item.closingBalance.type === 'CREDIT') {
      return eTtl -= Number(item.closingBalance.amount);
    } else {
      return eTtl += Number(item.closingBalance.amount);
    }
  });
  return Number(eTtl.toFixed(2));
};

const calculateTotalExpenseEnd = data => {
  let eTtl;
  eTtl = 0;
  _.each(data, (item: any) => {
    if (item.forwardedBalance.type === 'CREDIT') {
      return eTtl -= Number(item.forwardedBalance.amount);
    } else {
      return eTtl += Number(item.forwardedBalance.amount);
    }
  });
  return Number(eTtl.toFixed(2));
};

const filterProfitLossSheetData = data => {
  let filterPlData: ProfitLossData = {};
  filterPlData.incArr = [];
  filterPlData.expArr = [];
  filterPlData.othArr = [];
  _.each(data, (grp: any) => {
    grp.isVisible = false;
    switch (grp.category) {
      case 'income':
        return filterPlData.incArr.push(grp);
      case 'expenses':
        return filterPlData.expArr.push(grp);
      default:
        return filterPlData.othArr.push(grp);
    }
  });
  return filterPlData;
};

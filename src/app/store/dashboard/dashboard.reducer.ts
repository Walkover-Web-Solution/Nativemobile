import { IExpensesChartClosingBalanceResponse, IRevenueChartClosingBalanceResponse, ChartFilterType, ChartType } from "../../models/interfaces/dashboard.interface";
import { CustomActions } from "../../store/customActions";
import { DashboardConst } from "../../actions/dashboard/dashboard.const";
import { ChartCustomFilter } from "../../models/api-models/Dashboard";

export interface DashboardState {
    expensesChart: IExpensesChartClosingBalanceResponse;
    revenueChart: IRevenueChartClosingBalanceResponse;
    expensesChartError: string;
    revenueChartError: string;

    revenueChartFilter: ChartFilterType;
    expensesChartFilter: ChartFilterType;

    revenueChartCustomFilter: ChartCustomFilter;
    expensesChartCustomFilter: ChartCustomFilter;
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
    revenueChartFilter: ChartFilterType.ThisYearToDate,
    expensesChartFilter: ChartFilterType.ThisMonthToDate,
    revenueChartCustomFilter: {
        activeYear: {
            startDate: '', endDate: ''
        },
        lastYear: {
            startDate: '', endDate: ''
        },
    },
    expensesChartCustomFilter: {
        activeYear: {
            startDate: '', endDate: ''
        },
        lastYear: {
            startDate: '', endDate: ''
        },
    }
}

export function DashboardReducer(state: DashboardState = initialState, action: CustomActions): DashboardState {
    switch (action.type) {
        // region revenue chart
        case DashboardConst.REVENUE_CHART.GET_REVENUE_CHART_DATA_RESPONSE: {
            let data = action.payload as IRevenueChartClosingBalanceResponse;
            return Object.assign({}, state, {
                revenueChart: data
            });
        }
        case DashboardConst.REVENUE_CHART.GET_REVENUE_CHART_DATA_ERROR_RESPONSE: {
            return Object.assign({}, state, {
                revenueChart: action.payload,
                revenueChartError: 'Something Went Wrong'
            })
        }
        // endregion

        // region expenses chart
        case DashboardConst.EXPENSES_CHART.GET_EXPENSES_CHART_DATA_RESPONSE: {
            let data = action.payload as IExpensesChartClosingBalanceResponse;
            return Object.assign({}, state, {
                expensesChart: data
            });
        }

        case DashboardConst.EXPENSES_CHART.GET_EXPENSES_CHART_DATA_ERROR_RESPONSE: {
            return Object.assign({}, state, {
                expensesChart: action.payload,
                expensesChartFilter: 'Something Went Wrong'
            })
        }
        // endregion

        // region set chart filter
        case DashboardConst.SET_CHART_FILTER_TYPE: {
            if (action.payload.chartType === ChartType.Revenue) {
                if (action.payload.filterType === ChartFilterType.Custom) {
                    return Object.assign({}, state, {
                        revenueChartFilter: action.payload.filterType,
                        revenueChartCustomFilter: action.payload.customFilterObj
                    });
                } else {
                    return Object.assign({}, state, {
                        revenueChartFilter: action.payload.filterType,
                        revenueChartCustomFilter: {
                            activeYear: {
                                startDate: '', endDate: ''
                            },
                            lastYear: {
                                startDate: '', endDate: ''
                            },
                        }
                    });
                }
            } else {
                if (action.payload.filterType === ChartFilterType.Custom) {
                    return Object.assign({}, state, {
                        expensesChartFilter: action.payload.filterType,
                        expensesChartCustomFilter: action.payload.customFilterObj
                    })
                } else {
                    return Object.assign({}, state, {
                        expensesChartFilter: action.payload.filterType,
                        expensesChartCustomFilter: {
                            activeYear: {
                                startDate: '', endDate: ''
                            },
                            lastYear: {
                                startDate: '', endDate: ''
                            },
                        }
                    })
                }
            }
        }
        // endregion
        default:
            return state;
    }
}

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
        chartTitle: '', label: { activeYearLabel: '', lastYearLabel: '' }, indirectexpensesActiveyear: null,
        indirectexpensesLastyear: null, operatingcostActiveyear: null, operatingcostLastyear: null
    },
    revenueChart: {
        chartTitle: '', label: { activeYearLabel: '', lastYearLabel: '' }, otherincomeActiveyear: null,
        otherincomeLastyear: null, revenuefromoperationsActiveyear: null, revenuefromoperationsLastyear: null
    },
    expensesChartError: '',
    revenueChartError: '',
    revenueChartFilter: ChartFilterType.LastQuater,
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
        case DashboardConst.REVENUE_CHART.GET_REVENUE_CHART_DATA_ACTIVE_YEAR_RESPONSE: {
            let data = action.payload as IRevenueChartClosingBalanceResponse;
            return Object.assign({}, state, {
                revenueChart: Object.assign({}, state.revenueChart, {
                    revenuefromoperationsActiveyear: data.revenuefromoperationsActiveyear,
                    otherincomeActiveyear: data.otherincomeActiveyear,
                    chartTitle: data.chartTitle,
                    label: Object.assign({}, state.revenueChart.label, {
                        activeYearLabel: data.label.activeYearLabel
                    })
                })
            });
        }
        case DashboardConst.REVENUE_CHART.GET_REVENUE_CHART_DATA_LAST_YEAR_RESPONSE: {
            let data = action.payload as IRevenueChartClosingBalanceResponse;
            return Object.assign({}, state, {
                revenueChart: Object.assign({}, state.revenueChart, {
                    revenuefromoperationsLastyear: data.revenuefromoperationsLastyear,
                    otherincomeLastyear: data.otherincomeLastyear,
                    chartTitle: data.chartTitle,
                    label: Object.assign({}, state.revenueChart.label, {
                        lastYearLabel: data.label.activeYearLabel
                    })
                })
            });
        }
        case DashboardConst.REVENUE_CHART.GET_REVENUE_CHART_DATA_ACTIVE_YEAR_ERROR: {
            return Object.assign({}, state, {
                revenueChart: Object.assign({}, state.revenueChart, {
                    chartTitle: '', label: { activeYearLabel: '' }, otherincomeActiveyear: null,
                    revenuefromoperationsActiveyear: null
                }),
                revenueChartError: 'Something Went Wrong'
            })
        }
        case DashboardConst.REVENUE_CHART.GET_REVENUE_CHART_DATA_LAST_YEAR_ERROR: {
            return Object.assign({}, state, {
                revenueChart: Object.assign({}, state.revenueChart, {
                    chartTitle: '', label: { lastYearLabel: '' }, otherincomeLastyear: null,
                    revenuefromoperationsLastyear: null
                }),
                revenueChartError: 'Something Went Wrong'
            })
        }
        // endregion

        // region expenses chart
        case DashboardConst.EXPENSES_CHART.GET_EXPENSES_CHART_DATA_ACTIVE_YEAR_RESPONSE: {
            let data = action.payload as IExpensesChartClosingBalanceResponse;
            return Object.assign({}, state, {
                expensesChart: Object.assign({}, state.expensesChart, {
                    operatingcostActiveyear: data.operatingcostActiveyear,
                    indirectexpensesActiveyear: data.indirectexpensesActiveyear,
                    chartTitle: data.chartTitle,
                    label: Object.assign({}, state.expensesChart.label, {
                        activeYearLabel: data.label.activeYearLabel
                    })
                })
            });
        }

        case DashboardConst.EXPENSES_CHART.GET_EXPENSES_CHART_DATA_LAST_YEAR_RESPONSE: {
            let data = action.payload as IExpensesChartClosingBalanceResponse;
            return Object.assign({}, state, {
                expensesChart: Object.assign({}, state.expensesChart, {
                    operatingcostLastyear: data.operatingcostLastyear,
                    indirectexpensesLastyear: data.indirectexpensesLastyear,
                    chartTitle: data.chartTitle,
                    label: Object.assign({}, state.expensesChart.label, {
                        lastYearLabel: data.label.lastYearLabel
                    })
                })
            });
        }

        case DashboardConst.EXPENSES_CHART.GET_EXPENSES_CHART_DATA_ACTIVE_YEAR_ERROR: {
            return Object.assign({}, state, {
                expensesChart: Object.assign({}, state.expensesChart, {
                    operatingcostActiveyear: '', indirectexpensesActiveyear: '',
                    chartTitle: '',
                    label: Object.assign({}, state.expensesChart.label, {
                        activeYearLabel: ''
                    })
                }),
                expensesChartFilter: 'Something Went Wrong'
            })
        }

        case DashboardConst.EXPENSES_CHART.GET_EXPENSES_CHART_DATA_LAST_YEAR_ERROR: {
            return Object.assign({}, state, {
                expensesChart: Object.assign({}, state.expensesChart, {
                    operatingcostLastyear: '', indirectexpensesLastyear: '',
                    chartTitle: '',
                    label: Object.assign({}, state.expensesChart.label, {
                        lastYearLabel: ''
                    })
                }),
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

        // region reset state
        case DashboardConst.RESET_DASHBOARD_STATE:
            return initialState;
        // endregion
        default:
            return state;
    }
}

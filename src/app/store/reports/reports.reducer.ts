import { CustomActions } from "../../store/customActions";
import { ChartFilterType, IReportChartData } from "../../models/interfaces/dashboard.interface";
import { ReportConst } from "../../actions/reports/reports.const";
import { GroupHistoryResponse, CategoryHistoryResponse, ChartFilterConfigs } from "../../models/api-models/Dashboard";
import * as _ from 'lodash';
import * as moment from 'moment/moment';

export interface ReportsState {
    currentData: IReportChartData,
    previousData: IReportChartData,
    profitLossChartFilter: ChartFilterType,
}

const initialState: ReportsState = {
    currentData: {
        incomeData: null,
        expensesData: null,
        legend: [],
        from: '',
        to: ''
    },
    previousData: {
        incomeData: null,
        expensesData: null,
        legend: [],
        from: '',
        to: ''
    },
    profitLossChartFilter: ChartFilterType.LastMonth
};

export function ReportsReducer(state: ReportsState = initialState, action: CustomActions): ReportsState {
    switch (action.type) {
        //#region Income Data
        case ReportConst.PROFIT_LOSS_CHART.GET_INCOME_DATA_RESPONSE: {
            let payload: { data: CategoryHistoryResponse, config: ChartFilterConfigs } = action.payload;
            let filterType = _.cloneDeep(state.profitLossChartFilter);
            let currentIncomeData;
            let previousIncomeData;

            currentIncomeData = Object.assign({}, payload.data, {
                intervalBalances: payload.data.intervalBalances.filter(ip => {
                    return moment(ip.from, 'YYYY-MM-DD').isAfter(moment(payload.config.lastYear.endDate, 'DD-MM-YYYY'))
                })
            })

            if (currentIncomeData.intervalBalances.length !== payload.config.legend.length) {
                let key = filterType === ChartFilterType.ThisMonthToDate || filterType === ChartFilterType.LastMonth ? 'weekly' : 'monthly';
                debugger
                let ranges = getDateRange(moment(payload.config.activeYear.startDate, 'DD-MM-YYYY'),
                    moment(payload.config.activeYear.endDate, 'DD-MM-YYYY'), key);
                let weeks = []
                debugger
                ranges.forEach(r => {
                    currentIncomeData.intervalBalances.forEach(ib => {
                        debugger
                        if (moment(ib.from, 'YYYY-MM-DD').isBetween(r.rangeStart, r.rangeEnd)) {

                        }
                    });
                });
            }

            previousIncomeData = Object.assign({}, payload.data, {
                intervalBalances: payload.data.intervalBalances.filter(ip => {
                    return moment(ip.from, 'YYYY-MM-DD').isBefore(moment(payload.config.activeYear.startDate, 'DD-MM-YYYY'))
                })
            });

            return Object.assign({}, state, {
                currentData: Object.assign({}, state.currentData, {
                    incomeData: currentIncomeData,
                    legend: payload.config.legend,
                    from: payload.config.activeYear.startDate,
                    to: payload.config.activeYear.endDate
                }),
                previousData: Object.assign({}, state.previousData, {
                    incomeData: previousIncomeData,
                    legend: payload.config.legend,
                    from: payload.config.lastYear.startDate,
                    to: payload.config.lastYear.endDate
                })
            });
        }

        case ReportConst.PROFIT_LOSS_CHART.GET_INCOME_DATA_ERROR: {
            return Object.assign({}, state, {
                currentData: Object.assign({}, state.currentData, {
                    incomeData: null,
                    legend: [],
                    from: '',
                    to: ''
                }),
                previousData: Object.assign({}, state.currentData, {
                    incomeData: null,
                    legend: [],
                    from: '',
                    to: ''
                })
            });
        }
        //#endregion

        //#region Expenses Data
        case ReportConst.PROFIT_LOSS_CHART.GET_EXPENSES_DATA_RESPONSE: {
            let payload: { data: GroupHistoryResponse, config: ChartFilterConfigs } = action.payload;
            let currentExpenseData;
            let previousExpenseData;

            currentExpenseData = Object.assign({}, payload.data, {
                groups: payload.data.groups.map(fa => {
                    let intervalBalances = fa.intervalBalances.filter(fil => {
                        return moment(fil.from, 'YYYY-MM-DD').isAfter(moment(payload.config.lastYear.endDate, 'DD-MM-YYYY'))
                    });
                    return Object.assign({}, fa, {
                        intervalBalances
                    });
                })
            });

            previousExpenseData = Object.assign({}, payload.data, {
                groups: payload.data.groups.map(fa => {
                    let intervalBalances = fa.intervalBalances.filter(fil => {
                        return moment(fil.from, 'YYYY-MM-DD').isBefore(moment(payload.config.activeYear.startDate, 'DD-MM-YYYY'))
                    });
                    return Object.assign({}, fa, {
                        intervalBalances
                    });
                })
            });

            return Object.assign({}, state, {
                currentData: Object.assign({}, state.currentData, {
                    expensesData: currentExpenseData,
                    legend: payload.config.legend,
                    from: payload.config.activeYear.startDate,
                    to: payload.config.activeYear.endDate
                }),
                previousData: Object.assign({}, state.previousData, {
                    expensesData: previousExpenseData,
                    legend: payload.config.legend,
                    from: payload.config.lastYear.startDate,
                    to: payload.config.lastYear.endDate
                })
            });
        }

        case ReportConst.PROFIT_LOSS_CHART.GET_EXPENSES_DATA_ERROR: {
            return Object.assign({}, state, {
                currentData: Object.assign({}, state.currentData, {
                    expensesData: null,
                    legend: [],
                    from: '',
                    to: ''
                }),
                previousData: Object.assign({}, state.currentData, {
                    expensesData: null,
                    legend: [],
                    from: '',
                    to: ''
                })
            });
        }
        //#endregion
        default:
            break;
    }
    return state;
}

const getDate = (start, end, key, arr = [start.startOf(key)]) => {
    if (start.isAfter(end)) throw new Error('start must precede end')
    const next = moment(start).add(1, key).startOf(key);
    if (next.isAfter(end, key)) return arr;

    return getDate(next, end, key, arr.concat(next));
}

const getDateRange = (start, end, key, arr = [{ rangeStart: start.startOf(key), rangeEnd: moment(start).endOf(key) }]) => {
    if (start.isAfter(end)) throw new Error('start must precede end')

    // const next = moment(start).add(1, key).startOf(key);
    let rangeStart = moment(start).add(1, key).startOf(key);
    let rangeEnd = moment(rangeStart).endOf(key);
    const range = { rangeStart, rangeEnd };

    if (rangeEnd.isAfter(end)) return arr;

    return getDateRange(rangeEnd, end, key, arr.concat(range));
}

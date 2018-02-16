import { CustomActions } from "../../store/customActions";
import { ChartFilterType, IReportChartData, IIntervalBalancesItem } from "../../models/interfaces/dashboard.interface";
import { ReportConst } from "../../actions/reports/reports.const";
import { GroupHistoryResponse, CategoryHistoryResponse, ChartFilterConfigs } from "../../models/api-models/Dashboard";
import * as _ from 'lodash';
import * as moment from 'moment/moment';

moment.updateLocale('en', {
    'week': {
        dow: 1,
        doy: 1
    }
});

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
            let config: ChartFilterConfigs = _.cloneDeep(payload.config);
            let filterType = _.cloneDeep(state.profitLossChartFilter);

            let isWeekly = filterType === ChartFilterType.LastMonth || filterType === ChartFilterType.ThisMonthToDate;

            let keyType = isWeekly ? 'week' : 'month';
            let currentRange = getDateRange(moment(config.activeYear.startDate, 'DD-MM-YYYY'), moment(config.activeYear.endDate, 'DD-MM-YYYY'), keyType);
            let previousRange = getDateRange(moment(config.lastYear.startDate, 'DD-MM-YYYY'), moment(config.lastYear.endDate, 'DD-MM-YYYY'), keyType);
            let currentIncomeData = Object.assign({}, payload.data);
            let previousIncomeData = Object.assign({}, payload.data);
            let currentLegend = config.legend;
            let previousLegend = config.legend;

            let currentObj = [];
            let previousObj = [];

            if (isWeekly) {
                currentLegend = [];
                previousLegend = [];

                currentRange.forEach((cr, ind) => {
                    currentObj.push(currentIncomeData.intervalBalances.filter(ic => {
                        return moment(ic.from, 'YYYY-MM-DD').isBetween(moment(cr.rangeStart, 'DD-MM-YYYY'), moment(cr.rangeEnd, 'DD-MM-YYYY'), null, '[]');
                    }));
                    currentLegend.push(`Week ${ind}`);
                });
                currentIncomeData.intervalBalances = [];
                currentObj.forEach(co => {
                    let newCObj: IIntervalBalancesItem = {
                        creditTotal: _.sumBy(co, 'creditTotal'),
                        debitTotal: _.sumBy(co, 'debitTotal'),
                        from: co[0].from,
                        to: co[co.length - 1].to,
                        openingBalance: co[0].openingBalance,
                        closingBalance: co[co.length - 1].closingBalance
                    };
                    currentIncomeData.intervalBalances.push(newCObj);
                });

                previousRange.forEach(cr => {
                    previousObj.push(previousIncomeData.intervalBalances.filter(ic => {
                        return moment(ic.from, 'YYYY-MM-DD').isBetween(moment(cr.rangeStart, 'DD-MM-YYYY'), moment(cr.rangeEnd, 'DD-MM-YYYY'), null, '[]');
                    }));
                });
                previousIncomeData.intervalBalances = [];
                previousObj.forEach((po, ind) => {
                    let newCObj: IIntervalBalancesItem = {
                        creditTotal: _.sumBy(po, 'creditTotal'),
                        debitTotal: _.sumBy(po, 'debitTotal'),
                        from: po[0].from,
                        to: po[po.length - 1].to,
                        openingBalance: po[0].openingBalance,
                        closingBalance: po[po.length - 1].closingBalance
                    };
                    previousIncomeData.intervalBalances.push(newCObj);
                    previousLegend.push(`Week ${ind}`);
                });
            } else {
                currentRange.forEach((cr, ind) => {
                    currentObj.push(currentIncomeData.intervalBalances.find(ic => {
                        return moment(ic.from, 'YYYY-MM-DD').isBetween(moment(cr.rangeStart, 'DD-MM-YYYY'), moment(cr.rangeEnd, 'DD-MM-YYYY'), null, '[]');
                    }));
                });

                previousRange.forEach((cr, ind) => {
                    previousObj.push(previousIncomeData.intervalBalances.find(ic => {
                        return moment(ic.from, 'YYYY-MM-DD').isBetween(moment(cr.rangeStart, 'DD-MM-YYYY'), moment(cr.rangeEnd, 'DD-MM-YYYY'), null, '[]');
                    }));
                });

                currentIncomeData.intervalBalances = [];
                previousIncomeData.intervalBalances = [];

                currentObj.forEach((co, ind) => {
                    if (!co) {
                        let newCObj: IIntervalBalancesItem = {
                            creditTotal: 0,
                            debitTotal: 0,
                            from: currentRange[ind].rangeStart.format('DD-MM-YYYY'),
                            to: currentRange[ind].rangeEnd.format('DD-MM-YYYY'),
                            openingBalance: { amount: 0, description: '', type: '' },
                            closingBalance: { amount: 0, type: '' },
                        };
                        currentIncomeData.intervalBalances.push(newCObj);
                    } else {
                        currentIncomeData.intervalBalances.push(co);
                    }
                })

                previousObj.forEach((co, ind) => {
                    if (!co) {
                        let newCObj: IIntervalBalancesItem = {
                            creditTotal: 0,
                            debitTotal: 0,
                            from: previousRange[ind].rangeStart.format('DD-MM-YYYY'),
                            to: previousRange[ind].rangeEnd.format('DD-MM-YYYY'),
                            openingBalance: { amount: 0, description: '', type: '' },
                            closingBalance: { amount: 0, type: '' },
                        };
                        previousIncomeData.intervalBalances.push(newCObj);
                    } else {
                        previousIncomeData.intervalBalances.push(co);
                    }
                })
            }
            return Object.assign({}, state, {
                currentData: Object.assign({}, state.currentData, {
                    incomeData: currentIncomeData,
                    legend: currentLegend,
                    from: payload.config.activeYear.startDate,
                    to: payload.config.activeYear.endDate
                }),
                previousData: Object.assign({}, state.previousData, {
                    incomeData: previousIncomeData,
                    legend: previousLegend,
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

const getDateRange = (start, end, key, arr = [{ rangeStart: moment(start), rangeEnd: moment(start).endOf(key) }]): Array<{ rangeStart: moment.Moment, rangeEnd: moment.Moment }> => {
    if (start.isAfter(end)) throw new Error('start must precede end')

    let rangeStart = moment(moment(start).add(1, key).startOf(key).format('DD-MM-YYYY'), 'DD-MM-YYYY');
    let rangeEnd = moment(moment(rangeStart).endOf(key).format('DD-MM-YYYY'), 'DD-MM-YYYY');
    let range = { rangeStart, rangeEnd };

    if (rangeEnd.isAfter(end)) {
        if (rangeStart.isAfter(end)) {
            return arr;
        } else {
            arr = arr.concat({ rangeStart, rangeEnd: end });
            return arr;
        }
    };

    return getDateRange(rangeEnd, end, key, arr.concat(range));
}

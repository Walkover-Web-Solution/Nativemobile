import { CustomActions } from "../../store/customActions";
import { ChartFilterType, IReportChartData, IIntervalBalancesItem } from "../../models/interfaces/dashboard.interface";
import { ReportConst } from "../../actions/reports/reports.const";
import { GroupHistoryResponse, CategoryHistoryResponse, ChartFilterConfigs, ChartCustomFilter } from "../../models/api-models/Dashboard";
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
    profitLossChartCustomFilter: ChartCustomFilter;
}

const initialState: ReportsState = {
    currentData: {
        incomeData: null,
        expensesData: null,
        legend: [],
        from: '',
        to: '',
        lable: ''
    },
    previousData: {
        incomeData: null,
        expensesData: null,
        legend: [],
        from: '',
        to: '',
        lable: ''
    },
    profitLossChartFilter: ChartFilterType.LastQuater,
    profitLossChartCustomFilter: {
        activeYear: {
            startDate: '', endDate: ''
        },
        lastYear: {
            startDate: '', endDate: ''
        },
    }
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
            let currentIncomeData = _.cloneDeep(payload.data);
            let previousIncomeData = _.cloneDeep(payload.data);
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
                    currentLegend.push(`Week ${ind + 1}`);
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
                    previousLegend.push(`Week ${ind + 1}`);
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
                    from: config.activeYear.startDate,
                    to: config.activeYear.endDate,
                    lable: config.activeYear.lable
                }),
                previousData: Object.assign({}, state.previousData, {
                    incomeData: previousIncomeData,
                    legend: previousLegend,
                    from: config.lastYear.startDate,
                    to: config.lastYear.endDate,
                    lable: config.lastYear.lable
                })
            });
        }
        case ReportConst.PROFIT_LOSS_CHART.GET_INCOME_DATA_ERROR: {
            return Object.assign({}, state, {
                currentData: Object.assign({}, state.currentData, {
                    incomeData: null,
                    legend: [],
                    from: '',
                    to: '',
                    lable: ''
                }),
                previousData: Object.assign({}, state.currentData, {
                    incomeData: null,
                    legend: [],
                    from: '',
                    to: '',
                    lable: ''
                })
            });
        }
        //#endregion

        //#region Expenses Data
        case ReportConst.PROFIT_LOSS_CHART.GET_EXPENSES_DATA_RESPONSE: {
            let payload: { data: GroupHistoryResponse, config: ChartFilterConfigs } = action.payload;
            let config: ChartFilterConfigs = _.cloneDeep(payload.config);
            let filterType = _.cloneDeep(state.profitLossChartFilter);

            let isWeekly = filterType === ChartFilterType.LastMonth || filterType === ChartFilterType.ThisMonthToDate;

            let keyType = isWeekly ? 'week' : 'month';
            let currentRange = getDateRange(moment(config.activeYear.startDate, 'DD-MM-YYYY'), moment(config.activeYear.endDate, 'DD-MM-YYYY'), keyType);
            let previousRange = getDateRange(moment(config.lastYear.startDate, 'DD-MM-YYYY'), moment(config.lastYear.endDate, 'DD-MM-YYYY'), keyType);
            let currentExpenseData = _.cloneDeep(payload.data);
            let previousExpenseData = _.cloneDeep(payload.data);
            let currentLegend = config.legend;
            let previousLegend = config.legend;

            let currentObj = [];
            let previousObj = [];

            if (isWeekly) {
                currentLegend = [];
                previousLegend = [];

                currentExpenseData.groups.forEach(grp => {
                    currentRange.forEach((cr, ind) => {
                        let data = grp.intervalBalances.filter(ic => {
                            return moment(ic.from, 'YYYY-MM-DD').isBetween(moment(cr.rangeStart, 'DD-MM-YYYY'), moment(cr.rangeEnd, 'DD-MM-YYYY'), null, '[]');
                        });
                        currentObj.push({ intervalBalances: data, grp: grp.uniqueName });
                    });
                    grp.intervalBalances = [];
                });

                previousExpenseData.groups.forEach(grp => {
                    previousRange.forEach((cr, ind) => {
                        let data = grp.intervalBalances.filter(ic => {
                            return moment(ic.from, 'YYYY-MM-DD').isBetween(moment(cr.rangeStart, 'DD-MM-YYYY'), moment(cr.rangeEnd, 'DD-MM-YYYY'), null, '[]');
                        });
                        previousObj.push({ intervalBalances: data, grp: grp.uniqueName });
                    });
                    grp.intervalBalances = [];
                });

                currentObj.forEach(co => {
                    let newCObj: IIntervalBalancesItem = {
                        creditTotal: _.sumBy(co.intervalBalances, 'creditTotal'),
                        debitTotal: _.sumBy(co.intervalBalances, 'debitTotal'),
                        from: co.intervalBalances[0].from,
                        to: co.intervalBalances[co.intervalBalances.length - 1].to,
                        openingBalance: co.intervalBalances[0].openingBalance,
                        closingBalance: co.intervalBalances[co.intervalBalances.length - 1].closingBalance
                    };

                    currentExpenseData.groups.map(grps => {
                        if (grps.uniqueName === co.grp) {
                            grps.intervalBalances.push(newCObj);
                        }
                        return grps;
                    });
                });

                previousObj.forEach(co => {
                    let newCObj: IIntervalBalancesItem = {
                        creditTotal: _.sumBy(co.intervalBalances, 'creditTotal'),
                        debitTotal: _.sumBy(co.intervalBalances, 'debitTotal'),
                        from: co.intervalBalances[0].from,
                        to: co.intervalBalances[co.intervalBalances.length - 1].to,
                        openingBalance: co.intervalBalances[0].openingBalance,
                        closingBalance: co.intervalBalances[co.intervalBalances.length - 1].closingBalance
                    };

                    previousExpenseData.groups.map(grps => {
                        if (grps.uniqueName === co.grp) {
                            grps.intervalBalances.push(newCObj);
                        }
                        return grps;
                    });
                });
            } else {
                currentExpenseData.groups.forEach(grp => {
                    currentRange.forEach((cr, ind) => {
                        let data = grp.intervalBalances.find(ic => {
                            return moment(ic.from, 'YYYY-MM-DD').isBetween(moment(cr.rangeStart, 'DD-MM-YYYY'), moment(cr.rangeEnd, 'DD-MM-YYYY'), null, '[]');
                        });
                        currentObj.push({ intervalBalances: data, grp: grp.uniqueName });
                    });
                    grp.intervalBalances = [];
                });

                previousExpenseData.groups.forEach(grp => {
                    previousRange.forEach((cr, ind) => {
                        let data = grp.intervalBalances.find(ic => {
                            return moment(ic.from, 'YYYY-MM-DD').isBetween(moment(cr.rangeStart, 'DD-MM-YYYY'), moment(cr.rangeEnd, 'DD-MM-YYYY'), null, '[]');
                        });
                        previousObj.push({ intervalBalances: data, grp: grp.uniqueName });
                    });
                    grp.intervalBalances = [];
                });

                currentObj.forEach((co, ind) => {
                    if (!co.intervalBalances) {
                        let newCObj: IIntervalBalancesItem = {
                            creditTotal: 0,
                            debitTotal: 0,
                            from: currentRange[ind].rangeStart.format('DD-MM-YYYY'),
                            to: currentRange[ind].rangeEnd.format('DD-MM-YYYY'),
                            openingBalance: { amount: 0, description: '', type: '' },
                            closingBalance: { amount: 0, type: '' },
                        };
                        currentExpenseData.groups.map(grps => {
                            if (grps.uniqueName === co.grp) {
                                grps.intervalBalances.push(newCObj);
                            }
                            return grps;
                        });
                    } else {
                        currentExpenseData.groups.map(grps => {
                            if (grps.uniqueName === co.grp) {
                                grps.intervalBalances.push(co.intervalBalances);
                            }
                            return grps;
                        });
                    }
                });

                previousObj.forEach((co, ind) => {
                    if (!co.intervalBalances) {
                        let newCObj: IIntervalBalancesItem = {
                            creditTotal: 0,
                            debitTotal: 0,
                            from: previousRange[ind].rangeStart.format('DD-MM-YYYY'),
                            to: previousRange[ind].rangeEnd.format('DD-MM-YYYY'),
                            openingBalance: { amount: 0, description: '', type: '' },
                            closingBalance: { amount: 0, type: '' },
                        };
                        previousExpenseData.groups.map(grps => {
                            if (grps.uniqueName === co.grp) {
                                grps.intervalBalances.push(newCObj);
                            }
                            return grps;
                        });
                    } else {
                        previousExpenseData.groups.map(grps => {
                            if (grps.uniqueName === co.grp) {
                                grps.intervalBalances.push(co.intervalBalances);
                            }
                            return grps;
                        });
                    }
                });
            }

            return Object.assign({}, state, {
                currentData: Object.assign({}, state.currentData, {
                    expensesData: currentExpenseData,
                    legend: payload.config.legend,
                    from: payload.config.activeYear.startDate,
                    to: payload.config.activeYear.endDate,
                    lable: config.activeYear.lable
                }),
                previousData: Object.assign({}, state.previousData, {
                    expensesData: previousExpenseData,
                    legend: payload.config.legend,
                    from: payload.config.lastYear.startDate,
                    to: payload.config.lastYear.endDate,
                    lable: config.lastYear.lable
                })
            });
        }

        case ReportConst.PROFIT_LOSS_CHART.GET_EXPENSES_DATA_ERROR: {
            return Object.assign({}, state, {
                currentData: Object.assign({}, state.currentData, {
                    expensesData: null,
                    legend: [],
                    from: '',
                    to: '',
                    lable: ''
                }),
                previousData: Object.assign({}, state.currentData, {
                    expensesData: null,
                    legend: [],
                    from: '',
                    to: '',
                    lable: ''
                })
            });
        }
        //#endregion

        case ReportConst.SET_REPORT_FILTER_TYPE: {
            if (action.payload.filterType === ChartFilterType.Custom) {
                return Object.assign({}, state, {
                    profitLossChartFilter: action.payload.filterType,
                    profitLossChartCustomFilter: action.payload.customFilterObj
                });
            } else {
                return Object.assign({}, state, {
                    profitLossChartFilter: action.payload.filterType,
                    profitLossChartCustomFilter: {
                        activeYear: {
                            startDate: '', endDate: ''
                        },
                        lastYear: {
                            startDate: '', endDate: ''
                        },
                    }
                });
            }
        }
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

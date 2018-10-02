import {CustomActions} from '../../store/customActions';
import {ChartFilterType, IIntervalBalancesItem, IReportChartData} from '../../models/interfaces/dashboard.interface';
import {ReportConst} from '../../actions/reports/reports.const';
import {CategoryHistoryResponse, ChartCustomFilter, ChartFilterConfigs, GroupHistoryResponse} from '../../models/api-models/Dashboard';
import * as _ from 'lodash';
import * as moment from 'moment/moment';
import {BalanceSheetData, ProfitLossDataV3} from '../../models/api-models/tb-pl-bs';

moment.updateLocale('en', {
    'week': {
        dow: 1,
        doy: 1
    }
});

interface PlState {
    data?: ProfitLossDataV3;
    showLoader: boolean;
    noData: boolean;
}

interface BsState {
    data?: BalanceSheetData;
    showLoader: boolean;
    noData: boolean;
}

export interface ReportsState {
    currentData: IReportChartData,
    previousData: IReportChartData,
    profitLossChartFilter: ChartFilterType,
    profirLossChartFilterTitle: string;
    profitLossChartCustomFilter: ChartCustomFilter;
    activeChartType: string;
    profitLossSheet: PlState;
    balanceSheet: BsState
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
    profitLossChartFilter: ChartFilterType.LastMonth,
    profirLossChartFilterTitle: 'Last Month',
    profitLossChartCustomFilter: {
        activeYear: {
            startDate: '', endDate: ''
        },
        lastYear: {
            startDate: '', endDate: ''
        },
    },
    profitLossSheet: {
        data: null,
        noData: true,
        showLoader: false
    },
    balanceSheet: {
        data: null,
        noData: true,
        showLoader: false
    },
    activeChartType: 'current'
};

let isErrorInIncomeData = false;
let isErrorInExpenseData = false;

export function ReportsReducer(state: ReportsState = initialState, action: CustomActions): ReportsState {
    switch (action.type) {
        //#region Income Data
        case ReportConst.PROFIT_LOSS_CHART.GET_INCOME_DATA_REQUEST: {
            isErrorInIncomeData = false;
            return state;
        }
        case ReportConst.PROFIT_LOSS_CHART.GET_INCOME_DATA_RESPONSE: {
            isErrorInIncomeData = false;
            const payload: { data: CategoryHistoryResponse, config: ChartFilterConfigs } = action.payload;
            const config: ChartFilterConfigs = _.cloneDeep(payload.config);
            const filterType = _.cloneDeep(state.profitLossChartFilter);

            const isWeekly = filterType === ChartFilterType.LastMonth || filterType === ChartFilterType.ThisMonthToDate;

            const keyType = isWeekly ? 'week' : 'month';
            const currentRange = getDateRange(moment(config.activeYear.startDate, 'DD-MM-YYYY'), moment(config.activeYear.endDate, 'DD-MM-YYYY'), keyType);
            const previousRange = getDateRange(moment(config.lastYear.startDate, 'DD-MM-YYYY'), moment(config.lastYear.endDate, 'DD-MM-YYYY'), keyType);
            const currentIncomeData = _.cloneDeep(payload.data);
            const previousIncomeData = _.cloneDeep(payload.data);
            let currentLegend = config.legend;
            let previousLegend = config.legend;

            const currentObj = [];
            const previousObj = [];

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
                    const newCObj: IIntervalBalancesItem = {
                        creditTotal: _.sumBy(co, 'creditTotal'),
                        debitTotal: _.sumBy(co, 'debitTotal'),
                        from: co[0].from,
                        to: co[co.length - 1].to,
                        openingBalance: co[0].openingBalance,
                        closingBalance: co[co.length - 1].closingBalance
                    };
                    currentIncomeData.intervalBalances.push(newCObj);
                });

                previousRange.forEach((cr, ind) => {
                    previousObj.push(previousIncomeData.intervalBalances.filter(ic => {
                        return moment(ic.from, 'YYYY-MM-DD').isBetween(moment(cr.rangeStart, 'DD-MM-YYYY'), moment(cr.rangeEnd, 'DD-MM-YYYY'), null, '[]');
                    }));
                    previousLegend.push(`Week ${ind + 1}`);
                });
                previousIncomeData.intervalBalances = [];
                previousObj.forEach((po, ind) => {
                    const newCObj: IIntervalBalancesItem = {
                        creditTotal: _.sumBy(po, 'creditTotal'),
                        debitTotal: _.sumBy(po, 'debitTotal'),
                        from: po[0].from,
                        to: po[po.length - 1].to,
                        openingBalance: po[0].openingBalance,
                        closingBalance: po[po.length - 1].closingBalance
                    };
                    previousIncomeData.intervalBalances.push(newCObj);
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
                        const newCObj: IIntervalBalancesItem = {
                            creditTotal: 0,
                            debitTotal: 0,
                            from: currentRange[ind].rangeStart.format('DD-MM-YYYY'),
                            to: currentRange[ind].rangeEnd.format('DD-MM-YYYY'),
                            openingBalance: {amount: 0, description: '', type: ''},
                            closingBalance: {amount: 0, type: ''},
                        };
                        currentIncomeData.intervalBalances.push(newCObj);
                    } else {
                        currentIncomeData.intervalBalances.push(co);
                    }
                })

                previousObj.forEach((co, ind) => {
                    if (!co) {
                        const newCObj: IIntervalBalancesItem = {
                            creditTotal: 0,
                            debitTotal: 0,
                            from: previousRange[ind].rangeStart.format('DD-MM-YYYY'),
                            to: previousRange[ind].rangeEnd.format('DD-MM-YYYY'),
                            openingBalance: {amount: 0, description: '', type: ''},
                            closingBalance: {amount: 0, type: ''},
                        };
                        previousIncomeData.intervalBalances.push(newCObj);
                    } else {
                        previousIncomeData.intervalBalances.push(co);
                    }
                })
            }
            return Object.assign({}, state, {
                currentData: Object.assign({}, state.currentData, {
                    incomeData: !isErrorInExpenseData ? currentIncomeData : null,
                    legend: currentLegend,
                    from: config.activeYear.startDate,
                    to: config.activeYear.endDate,
                    lable: config.activeYear.lable
                }),
                previousData: Object.assign({}, state.previousData, {
                    incomeData: !isErrorInExpenseData ? previousIncomeData : null,
                    legend: previousLegend,
                    from: config.lastYear.startDate,
                    to: config.lastYear.endDate,
                    lable: config.lastYear.lable
                })
            });
        }
        case ReportConst.PROFIT_LOSS_CHART.GET_INCOME_DATA_ERROR: {
            const config: ChartFilterConfigs = _.cloneDeep(action.payload.config);
            isErrorInIncomeData = true;
            return Object.assign({}, state, {
                currentData: Object.assign({}, state.currentData, {
                    incomeData: null,
                    expensesData: null,
                    legend: [],
                    from: config.activeYear.startDate,
                    to: config.activeYear.endDate,
                    lable: config.activeYear.lable
                }),
                previousData: Object.assign({}, state.previousData, {
                    incomeData: null,
                    expensesData: null,
                    legend: [],
                    from: config.lastYear.startDate,
                    to: config.lastYear.endDate,
                    lable: config.lastYear.lable
                })
            });
        }
        //#endregion

        //#region Expenses Data
        case ReportConst.PROFIT_LOSS_CHART.GET_EXPENSES_DATA_REQUEST: {
            isErrorInExpenseData = false;
            return state;
        }
        case ReportConst.PROFIT_LOSS_CHART.GET_EXPENSES_DATA_RESPONSE: {
            isErrorInExpenseData = false;
            const payload: { data: GroupHistoryResponse, config: ChartFilterConfigs } = action.payload;
            const config: ChartFilterConfigs = _.cloneDeep(payload.config);
            const filterType = _.cloneDeep(state.profitLossChartFilter);

            const isWeekly = filterType === ChartFilterType.LastMonth || filterType === ChartFilterType.ThisMonthToDate;

            const keyType = isWeekly ? 'week' : 'month';
            const currentRange = getDateRange(moment(config.activeYear.startDate, 'DD-MM-YYYY'), moment(config.activeYear.endDate, 'DD-MM-YYYY'), keyType);
            const previousRange = getDateRange(moment(config.lastYear.startDate, 'DD-MM-YYYY'), moment(config.lastYear.endDate, 'DD-MM-YYYY'), keyType);
            const currentExpenseData = _.cloneDeep(payload.data);
            const previousExpenseData = _.cloneDeep(payload.data);
            let currentLegend = config.legend;
            let previousLegend = config.legend;

            const currentObj = [];
            const previousObj = [];

            if (isWeekly) {
                currentLegend = [];
                previousLegend = [];

                currentExpenseData.groups.forEach(grp => {
                    currentRange.forEach((cr, ind) => {
                        const data = grp.intervalBalances.filter(ic => {
                            return moment(ic.from, 'YYYY-MM-DD').isBetween(moment(cr.rangeStart, 'DD-MM-YYYY'), moment(cr.rangeEnd, 'DD-MM-YYYY'), null, '[]');
                        });
                        currentObj.push({intervalBalances: data, grp: grp.uniqueName});
                    });
                    grp.intervalBalances = [];
                });

                previousExpenseData.groups.forEach(grp => {
                    previousRange.forEach((cr, ind) => {
                        const data = grp.intervalBalances.filter(ic => {
                            return moment(ic.from, 'YYYY-MM-DD').isBetween(moment(cr.rangeStart, 'DD-MM-YYYY'), moment(cr.rangeEnd, 'DD-MM-YYYY'), null, '[]');
                        });
                        previousObj.push({intervalBalances: data, grp: grp.uniqueName});
                    });
                    grp.intervalBalances = [];
                });

                currentObj.forEach(co => {
                    const newCObj: IIntervalBalancesItem = {
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
                    const newCObj: IIntervalBalancesItem = {
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
                        const data = grp.intervalBalances.find(ic => {
                            return moment(ic.from, 'YYYY-MM-DD').isBetween(moment(cr.rangeStart, 'DD-MM-YYYY'), moment(cr.rangeEnd, 'DD-MM-YYYY'), null, '[]');
                        });
                        currentObj.push({intervalBalances: data, grp: grp.uniqueName});
                    });
                    grp.intervalBalances = [];
                });

                previousExpenseData.groups.forEach(grp => {
                    previousRange.forEach((cr, ind) => {
                        const data = grp.intervalBalances.find(ic => {
                            return moment(ic.from, 'YYYY-MM-DD').isBetween(moment(cr.rangeStart, 'DD-MM-YYYY'), moment(cr.rangeEnd, 'DD-MM-YYYY'), null, '[]');
                        });
                        previousObj.push({intervalBalances: data, grp: grp.uniqueName});
                    });
                    grp.intervalBalances = [];
                });

                currentObj.forEach((co, ind) => {
                    if (!co.intervalBalances) {
                        const newCObj: IIntervalBalancesItem = {
                            creditTotal: 0,
                            debitTotal: 0,
                            from: currentRange[ind] ? currentRange[ind].rangeStart.format('DD-MM-YYYY') : moment().format('DD-MM-YYYY'),
                            to: currentRange[ind] ? currentRange[ind].rangeEnd.format('DD-MM-YYYY') : moment().format('DD-MM-YYYY'),
                            openingBalance: {amount: 0, description: '', type: ''},
                            closingBalance: {amount: 0, type: ''},
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
                        const newCObj: IIntervalBalancesItem = {
                            creditTotal: 0,
                            debitTotal: 0,
                            from: previousRange[ind] ? previousRange[ind].rangeStart.format('DD-MM-YYYY') : moment().format('DD-MM-YYYY'),
                            to: previousRange[ind] ? previousRange[ind].rangeEnd.format('DD-MM-YYYY') : moment().format('DD-MM-YYYY'),
                            openingBalance: {amount: 0, description: '', type: ''},
                            closingBalance: {amount: 0, type: ''},
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
                    expensesData: !isErrorInIncomeData ? currentExpenseData : null,
                    // legend: payload.config.legend,
                    // from: payload.config.activeYear.startDate,
                    // to: payload.config.activeYear.endDate,
                    // lable: config.activeYear.lable
                }),
                previousData: Object.assign({}, state.previousData, {
                    expensesData: !isErrorInIncomeData ? previousExpenseData : null,
                    // legend: payload.config.legend,
                    // from: payload.config.lastYear.startDate,
                    // to: payload.config.lastYear.endDate,
                    // lable: config.lastYear.lable
                })
            });
        }

        case ReportConst.PROFIT_LOSS_CHART.GET_EXPENSES_DATA_ERROR: {
            const config: ChartFilterConfigs = _.cloneDeep(action.payload.config);
            isErrorInExpenseData = true;
            return Object.assign({}, state, {
                currentData: Object.assign({}, state.currentData, {
                    expensesData: null,
                    incomeData: null,
                    legend: [],
                    from: config.activeYear.startDate,
                    to: config.activeYear.endDate,
                    lable: config.activeYear.lable
                }),
                previousData: Object.assign({}, state.previousData, {
                    expensesData: null,
                    incomeData: null,
                    legend: [],
                    from: config.lastYear.startDate,
                    to: config.lastYear.endDate,
                    lable: config.lastYear.lable
                })
            });
        }
        //#endregion

        case ReportConst.SET_REPORT_FILTER_TYPE: {
            if (action.payload.filterObj.filterType === ChartFilterType.Custom) {
                return Object.assign({}, state, {
                    profitLossChartFilter: action.payload.filterObj.filterType,
                    profirLossChartFilterTitle: action.payload.filterObj.filterTitle,
                    profitLossChartCustomFilter: action.payload.customFilterObj
                });
            } else {
                return Object.assign({}, state, {
                    profitLossChartFilter: action.payload.filterObj.filterType,
                    profirLossChartFilterTitle: action.payload.filterObj.filterTitle,
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

        case ReportConst.SET_REPORT_ACTIVE_CHART_TYPE: {
            return Object.assign({}, state, {
                activeChartType: action.payload
            })
        }

        // region ProfitLoss Sheet Data
        case ReportConst.PROFIT_LOSS_SHEET.GET_PROFIT_LOSS_SHEET_REQUEST: {
            return Object.assign({}, state, {
                profitLossSheet: Object.assign({}, state.profitLossSheet, {
                    showLoader: true,
                })
            });
        }

        case ReportConst.PROFIT_LOSS_SHEET.GET_PROFIT_LOSS_SHEET_RESPONSE: {
            return Object.assign({}, state, {
                profitLossSheet: Object.assign({}, state.profitLossSheet, {
                    showLoader: false,
                    data: action.payload.body.incomeStatment
                })
            });
        }
        // endregion

        //  region Balance Sheet Data
        case ReportConst.BALANCE_SHEET.GET_BALANCE_SHEET_REQUEST: {
            return Object.assign({}, state, {
                balanceSheet: Object.assign({}, state.balanceSheet, {
                    showLoader: true,
                })
            });
        }
        case ReportConst.BALANCE_SHEET.GET_BALANCE_SHEET_RESPONSE: {
            const data: BalanceSheetData = prepareBalanceSheetData(_.cloneDeep(action.payload.body));
            return Object.assign({}, state, {
                balanceSheet: Object.assign({}, state.balanceSheet, {
                    showLoader: false,
                    data
                })
            });
        }
        // endregion
        default:
            break;
    }
    return state;
}

const getDate = (start, end, key, arr = [start.startOf(key)]) => {
    if (start.isAfter(end)) {
        throw new Error('start must precede end')
    }
    const next = moment(start).add(1, key).startOf(key);
    if (next.isAfter(end, key)) {
        return arr;
    }

    return getDate(next, end, key, arr.concat(next));
}

const getDateRange = (start, end, key, arr = [{
    rangeStart: moment(start),
    rangeEnd: moment(start).endOf(key)
}]): Array<{ rangeStart: moment.Moment, rangeEnd: moment.Moment }> => {
    if (start.isAfter(end)) {
        // console.log('start must precede end');
    }

    const rangeStart = moment(moment(start).add(1, key).startOf(key).format('DD-MM-YYYY'), 'DD-MM-YYYY');
    const rangeEnd = moment(moment(rangeStart).endOf(key).format('DD-MM-YYYY'), 'DD-MM-YYYY');
    const range = {rangeStart, rangeEnd};

    if (rangeEnd.isAfter(end)) {
        if (rangeStart.isAfter(end)) {
            return arr;
        } else {
            arr = arr.concat({rangeStart, rangeEnd: end});
            return arr;
        }
    }
    ;

    return getDateRange(rangeEnd, end, key, arr.concat(range));
}

// region Prepare Balance Sheet
const prepareBalanceSheetData = (data) => {
    const bsData: BalanceSheetData = filterBalanceSheetData(data.groupDetails);
    bsData.assetTotal = calCulateTotalAssets(bsData.assets);
    bsData.assetTotalEnd = calCulateTotalAssetsEnd(bsData.assets);
    bsData.liabTotal = calCulateTotalLiab(bsData.liabilities);
    bsData.liabTotalEnd = calCulateTotalLiabEnd(bsData.liabilities);
    return bsData;
};
const filterBalanceSheetData = data => {
    const filterPlData: BalanceSheetData = {};
    filterPlData.assets = [];
    filterPlData.liabilities = [];
    filterPlData.othArr = [];
    _.each(data, (grp: any) => {
        grp.isVisible = false;
        switch (grp.category) {
            case 'assets':
                return filterPlData.assets.push(grp);
            case 'liabilities':
                return filterPlData.liabilities.push(grp);
            default:
                return filterPlData.othArr.push(grp);
        }
    });
    return filterPlData;
};
const calCulateTotalAssets = data => {
    let total;
    total = 0;
    _.each(data, (obj: any) => {
        if (obj.closingBalance.type === 'CREDIT') {
            return total -= obj.closingBalance.amount;
        } else {
            return total += obj.closingBalance.amount;
        }
    });
    return total;
};
const calCulateTotalAssetsEnd = data => {
    let total;
    total = 0;
    _.each(data, (obj: any) => {
        if (obj.forwardedBalance.type === 'CREDIT') {
            return total -= obj.forwardedBalance.amount;
        } else {
            return total += obj.forwardedBalance.amount;
        }
    });
    return total;
};
const calCulateTotalLiab = data => {
    let total;
    total = 0;
    _.each(data, (obj: any) => {
        if (obj.closingBalance.type === 'DEBIT') {
            return total -= obj.closingBalance.amount;
        } else {
            return total += obj.closingBalance.amount;
        }
    });
    return total;
};
const calCulateTotalLiabEnd = data => {
    let total;
    total = 0;
    _.each(data, (obj: any) => {
        if (obj.forwardedBalance.type === 'DEBIT') {
            return total -= obj.forwardedBalance.amount;
        } else {
            return total += obj.forwardedBalance.amount;
        }
    });
    return total;
};
// endregion

import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {TlPlService} from '../../services/tl-pl.service';
import {AccountDetails, TrialBalanceRequest} from '../../models/api-models/tb-pl-bs';
import {CustomActions} from '../../store/customActions';
import {TlPlConst} from './tl-pl.const';
import {ChartFilterType, ChartType } from "../../models/interfaces/dashboard.interface";
import {ChartCustomFilter, ChartFilterConfigs} from '../../models/api-models/Dashboard';
import {ActiveFinancialYear} from '../../models/api-models/Company';
import * as moment from 'moment/moment';
import * as _ from 'lodash';

import {Observable} from 'rxjs/Observable';
import {Action} from '@ngrx/store';
import {BaseResponse} from '../../models/api-models/BaseResponse';
import {GroupService} from '../../services/group.service';
import {FlattenGroupsAccountsResponse} from '../../models/api-models/Group';
import {TransactionsRequest} from '../../models/api-models/Ledger';
import {LedgerService} from '../../services/ledger.service';
import {AccountService} from '../../services/account.service';
import {ToasterService} from '../../services/toaster.service';

@Injectable()
export class TBPlBsActions {

    @Effect()
    private GetTrialBalance$: Observable<CustomActions> = this.action$
        .ofType(TlPlConst.GET_TRIAL_BALANCE_REQUEST)
        .switchMap((action: CustomActions) => {
            console.log(JSON.stringify("calling Searvice"));
            return this._tlPlService.GetTrailBalance(action.payload)
                .map((r: BaseResponse<AccountDetails, TrialBalanceRequest>) => {
                    if (r.status !== 'success') {
                        this._toaster.errorToast(r.message);
                    }
                    console.log(JSON.stringify("hurrye I got tb pl data"));
                    return {
                        type: TlPlConst.GET_TRIAL_BALANCE_RESPONSE,
                        payload: r.status === 'success' ? r.body : null
                    };
                });
        });

    @Effect()
    private Search$: Observable<Action> = this.action$
        .ofType(TlPlConst.GET_FLAT_ACCOUNT_W_GROUP_REQUEST)
        .switchMap((action: CustomActions) => {
            return this._groupService.GetFlattenGroupsAccounts(action.payload.q, action.payload.page, action.payload.count, action.payload.showEmptyGroups)
                .map((r: BaseResponse<FlattenGroupsAccountsResponse, string>) => {
                    if (r.status !== 'success') {
                        this._toaster.errorToast(r.message);
                    }
                    return {
                        type: TlPlConst.GET_FLAT_ACCOUNT_W_GROUP_RESPONSE,
                        payload: r.status === 'success' ? r.body : []
                    }
                });
        });

    @Effect()
    public GetTransactions$: Observable<Action> = this.action$
        .ofType(TlPlConst.GET_ACC_TRANSACTION)
        .switchMap((action: CustomActions) => {
            let req: TransactionsRequest = action.payload as TransactionsRequest;
            return this._ledgerService.GetLedgerTranscations(req.q, req.page, req.count, req.accountUniqueName, req.from, req.to, req.sort, req.reversePage);
        }).map(res => {
            if (res.status !== 'success') {
                this._toaster.errorToast(res.message);
            }
            return {
                type: TlPlConst.GET_ACC_TRANSACTION_RESPONSE,
                payload: res.status === 'success' ? res.body : null
            }
        });

    @Effect()
    public GetAccountDetails$: Observable<Action> = this.action$
        .ofType(TlPlConst.GET_LEDGER_ACCOUNT)
        .switchMap((action: CustomActions) => this._accountService.GetAccountDetails(action.payload))
        .map(res => {
            if (res.status !== 'success') {
                this._toaster.errorToast(res.message);
            }
            return {
                type: TlPlConst.GET_LEDGER_ACCOUNT_RESPONSE,
                payload: res.status === 'success' ? res.body : null
            }
        });

    @Effect()
    public GetMoreTransactions$: Observable<Action> = this.action$
        .ofType(TlPlConst.GET_MORE_ACC_TRANSACTION)
        .switchMap((action: CustomActions) => {
            let req: TransactionsRequest = action.payload as TransactionsRequest;
            return this._ledgerService.GetLedgerTranscations(req.q, req.page, req.count, req.accountUniqueName, req.from, req.to, req.sort, req.reversePage);
        }).map(res => {
            if (res.status !== 'success') {
                this._toaster.errorToast(res.message);
            }
            return {
                type: TlPlConst.GET_MORE_ACC_TRANSACTION_RESPONSE,
                payload: res.status === 'success' ? res.body : null
            }
        });

    constructor(private action$: Actions, private _tlPlService: TlPlService, private _groupService: GroupService, private _ledgerService: LedgerService,
                private _accountService: AccountService, private _toaster: ToasterService) {

    }

    public GetTrialBalance(request: TrialBalanceRequest): CustomActions {
        return {
            type: TlPlConst.GET_TRIAL_BALANCE_REQUEST,
            payload: request
        };
    }

    public RESET_LOADER(): CustomActions {
        return {
            type: TlPlConst.RESET_LOADER
        };
    }

    public GetflatAccountWGroups(q: string = '', page: number = 1, count: number = 20000, showEmptyGroups: string = 'false'): CustomActions {
        return {
            type: TlPlConst.GET_FLAT_ACCOUNT_W_GROUP_REQUEST,
            payload: {
                q, page, count, showEmptyGroups
            }
        };
    }

    public GetTransactions(request: TransactionsRequest): CustomActions {
        return {
            type: TlPlConst.GET_ACC_TRANSACTION,
            payload: request
        };
    }

    public GetLedgerAccount(value: string): CustomActions {
        return {
            type: TlPlConst.GET_LEDGER_ACCOUNT,
            payload: value
        };
    }

    public GetMoreTransactions(request: TransactionsRequest): CustomActions {
        return {
            type: TlPlConst.GET_MORE_ACC_TRANSACTION,
            payload: request
        };
    }

    public setChartFilter(chartType: ChartType, filterType: ChartFilterType, customFilterObj: ChartCustomFilter): CustomActions {
        return {
            type: TlPlConst.SET_CHART_FILTER_TYPE,
            payload: { chartType, filterType, customFilterObj }
        };
    }

}


const parseDates = (filterType: ChartFilterType, activeFinancialYear: ActiveFinancialYear, lastFinancialYear: ActiveFinancialYear, customFilterObj: ChartCustomFilter): ChartFilterConfigs => {
    let config = new ChartFilterConfigs();
    switch (filterType) {
        case ChartFilterType.ThisMonthToDate: // This Month to Date
            config.ChartTitle = 'This Month to Date';
            config.activeYear.startDate = moment().startOf('month').format('DD-MM-YYYY');
            config.activeYear.endDate = moment().format('DD-MM-YYYY');
            config.activeYear.lable = moment().format('MMMM')

            config.lastYear.startDate = moment(config.activeYear.startDate, 'DD-MM-YYYY').subtract(1, 'month').format('DD-MM-YYYY');
            config.lastYear.endDate = moment(config.activeYear.endDate, 'DD-MM-YYYY').subtract(1, 'month').endOf('month').format('DD-MM-YYYY');
            config.lastYear.lable = moment(config.activeYear.startDate, 'DD-MM-YYYY').subtract(1, 'month').format('MMMM');

            config.legend = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
            return config;
        case ChartFilterType.ThisQuarterToDate: // This Quarter to Date
            config.ChartTitle = 'This Quarter to Date';
            config.activeYear.startDate = moment().quarter(moment().quarter()).startOf('quarter').format('DD-MM-YYYY');
            config.activeYear.endDate = moment().format('DD-MM-YYYY');
            config.activeYear.lable = 'Q' + moment().quarter();

            config.lastYear.startDate = moment(config.activeYear.startDate, 'DD-MM-YYYY').quarter(moment().quarter()).startOf('quarter').subtract(1, 'quarter').format('DD-MM-YYYY');
            config.lastYear.endDate = moment(config.activeYear.startDate, 'DD-MM-YYYY').quarter(moment().quarter()).endOf('quarter').subtract(1, 'quarter').format('DD-MM-YYYY');
            config.lastYear.lable = 'Q' + moment(config.activeYear.startDate, 'DD-MM-YYYY').quarter(moment().quarter()).endOf('quarter').subtract(1, 'quarter').quarter();

            config.legend = ['Month 1', 'Month 2', 'Month 3'];
            return config;
        case ChartFilterType.ThisFinancialYearToDate: // This Financial Year to Date
            config.ChartTitle = 'This Financial Year to Date';
            let activeLegend = [];
            let lastLegend = [];
            if (activeFinancialYear) {
                config.activeYear.startDate = moment(activeFinancialYear.financialYearStarts, 'DD-MM-YYYY').startOf('day').format('DD-MM-YYYY');
                // config.activeYear.endDate = moment(activeFinancialYear.financialYearEnds, 'DD-MM-YYYY').endOf('day').format('DD-MM-YYYY');
                config.activeYear.endDate = moment().format('DD-MM-YYYY');
                config.activeYear.lable = 'FY-' + moment(activeFinancialYear.financialYearStarts, 'DD-MM-YYYY').startOf('day').format('YY') + ' - FY-' + moment(activeFinancialYear.financialYearEnds, 'DD-MM-YYYY').endOf('day').format('YY');

                let dateStart = moment(config.activeYear.startDate, 'DD-MM-YYYY');
                let dateEnd = moment(config.activeYear.endDate, 'DD-MM-YYYY');
                while (dateEnd > dateStart || dateStart.format('M') === dateEnd.format('M')) {
                    activeLegend.push(dateStart.format('MMM'));
                    dateStart.add(1, 'month');
                }
            } else {
                config.activeYear.startDate = '00-00-0000';
                config.activeYear.endDate = '00-00-0000';
                config.activeYear.lable = '-None-';
            }

            if (lastFinancialYear) {
                config.lastYear.startDate = moment(lastFinancialYear.financialYearStarts, 'DD-MM-YYYY').startOf('day').format('DD-MM-YYYY');
                config.lastYear.endDate = moment(lastFinancialYear.financialYearEnds, 'DD-MM-YYYY').endOf('day').format('DD-MM-YYYY');
                config.lastYear.lable = 'FY-' + moment(lastFinancialYear.financialYearStarts, 'DD-MM-YYYY').startOf('day').format('YY') + ' - FY-' + moment(lastFinancialYear.financialYearEnds, 'DD-MM-YYYY').endOf('day').format('YY');

                let dateStart = moment(config.lastYear.startDate, 'DD-MM-YYYY');
                let dateEnd = moment(config.lastYear.endDate, 'DD-MM-YYYY');
                while (dateEnd > dateStart || dateStart.format('M') === dateEnd.format('M')) {
                    lastLegend.push(dateStart.format('MMM'));
                    dateStart.add(1, 'month');
                }
            } else {
                config.lastYear.startDate = moment(activeFinancialYear.financialYearStarts, 'DD-MM-YYYY').startOf('day').subtract(1, 'year').format('DD-MM-YYYY');
                config.lastYear.endDate = moment(activeFinancialYear.financialYearEnds, 'DD-MM-YYYY').endOf('day').subtract(1, 'year').format('DD-MM-YYYY');
                config.lastYear.lable = 'FY-' + moment(config.lastYear.startDate, 'DD-MM-YYYY').startOf('day').format('YY') + ' - FY-' + moment(config.lastYear.endDate, 'DD-MM-YYYY').endOf('day').format('YY');

                let dateStart = moment(config.lastYear.startDate, 'DD-MM-YYYY');
                let dateEnd = moment(config.lastYear.endDate, 'DD-MM-YYYY');
                while (dateEnd > dateStart || dateStart.format('M') === dateEnd.format('M')) {
                    lastLegend.push(dateStart.format('MMM'));
                    dateStart.add(1, 'month');
                }
            }

            config.legend = _.uniq(activeLegend.concat(lastLegend));
            return config;
        case ChartFilterType.ThisYearToDate: // This Year to Date
            config.ChartTitle = 'This Year to Date';
            config.activeYear.startDate = moment().startOf('year').format('DD-MM-YYYY');
            config.activeYear.endDate = moment().format('DD-MM-YYYY');
            config.activeYear.lable = moment().format('YYYY');

            config.lastYear.startDate = moment(config.activeYear.startDate, 'DD-MM-YYYY').subtract(1, 'year').format('DD-MM-YYYY');
            config.lastYear.endDate = moment(config.activeYear.endDate, 'DD-MM-YYYY').endOf('year').subtract(1, 'year').format('DD-MM-YYYY');
            config.lastYear.lable = moment(config.activeYear.startDate, 'DD-MM-YYYY').subtract(1, 'year').format('YYYY');

            config.legend = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            return config;
        case ChartFilterType.LastMonth: // Last Month
            config.ChartTitle = 'Last Month';
            config.activeYear.startDate = moment().startOf('month').subtract(1, 'month').format('DD-MM-YYYY');
            config.activeYear.endDate = moment().endOf('month').subtract(1, 'month').format('DD-MM-YYYY');
            config.activeYear.lable = moment().startOf('month').subtract(1, 'month').format('MMMM')

            config.lastYear.startDate = moment(config.activeYear.startDate, 'DD-MM-YYYY').startOf('month').subtract(1, 'month').format('DD-MM-YYYY');
            config.lastYear.endDate = moment(config.activeYear.endDate, 'DD-MM-YYYY').endOf('month').subtract(1, 'month').format('DD-MM-YYYY');
            config.lastYear.lable = moment(config.activeYear.endDate, 'DD-MM-YYYY').endOf('month').subtract(1, 'month').format('MMMM');

            config.legend = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
            return config;
        case ChartFilterType.LastQuater: // Last Quater
            config.ChartTitle = 'Last Quater';
            config.activeYear.startDate = moment().quarter(moment().quarter()).startOf('quarter').subtract(1, 'quarter').format('DD-MM-YYYY');
            config.activeYear.endDate = moment().quarter(moment().quarter()).endOf('quarter').subtract(1, 'quarter').format('DD-MM-YYYY');
            config.activeYear.lable = 'Q' + moment().quarter(moment().quarter()).startOf('quarter').subtract(1, 'quarter').quarter();

            config.lastYear.startDate = moment(config.activeYear.startDate, 'DD-MM-YYYY').startOf('quarter').subtract(1, 'quarter').format('DD-MM-YYYY');
            config.lastYear.endDate = moment(config.activeYear.startDate, 'DD-MM-YYYY').endOf('quarter').subtract(1, 'quarter').format('DD-MM-YYYY');
            config.lastYear.lable = 'Q' + moment(config.activeYear.startDate, 'DD-MM-YYYY').endOf('quarter').subtract(1, 'quarter').quarter();

            config.legend = ['Month 1', 'Month 2', 'Month 3'];
            return config;
        case ChartFilterType.LastFiancialYear: {
            // Last Fiancial Year
            config.ChartTitle = 'Last Fiancial Year';
            let activeLegend = [];
            let lastLegend = [];
            if (activeFinancialYear) {
                config.activeYear.startDate = moment(activeFinancialYear.financialYearStarts, 'DD-MM-YYYY').startOf('year').subtract(1, 'year').format('DD-MM-YYYY');
                config.activeYear.endDate = moment(activeFinancialYear.financialYearStarts, 'DD-MM-YYYY').endOf('year').subtract(1, 'year').format('DD-MM-YYYY');
                config.activeYear.lable = 'FY-' + moment(activeFinancialYear.financialYearStarts, 'DD-MM-YYYY').startOf('year').subtract(1, 'year').format('YY') + ' - FY-' + moment(activeFinancialYear.financialYearEnds, 'DD-MM-YYYY').endOf('year').subtract(1, 'year').format('YY');

                let dateStart = moment(config.activeYear.startDate, 'DD-MM-YYYY');
                let dateEnd = moment(config.activeYear.endDate, 'DD-MM-YYYY');
                while (dateEnd > dateStart || dateStart.format('M') === dateEnd.format('M')) {
                    activeLegend.push(dateStart.format('MMM'));
                    dateStart.add(1, 'month');
                }
            } else {
                config.activeYear.startDate = '00-00-0000';
                config.activeYear.endDate = '00-00-0000';
                config.activeYear.lable = '-None-';
            }

            if (lastFinancialYear) {
                config.lastYear.startDate = moment(lastFinancialYear.financialYearStarts, 'DD-MM-YYYY').startOf('year').subtract(1, 'year').format('DD-MM-YYYY');
                config.lastYear.endDate = moment(lastFinancialYear.financialYearStarts, 'DD-MM-YYYY').endOf('year').subtract(1, 'year').format('DD-MM-YYYY');
                config.lastYear.lable = 'FY-' + moment(lastFinancialYear.financialYearStarts, 'DD-MM-YYYY').startOf('year').subtract(1, 'year').format('YY') + ' - FY-' + moment(lastFinancialYear.financialYearEnds, 'DD-MM-YYYY').endOf('year').subtract(1, 'year').format('YY');

                let dateStart = moment(config.lastYear.startDate, 'DD-MM-YYYY');
                let dateEnd = moment(config.lastYear.endDate, 'DD-MM-YYYY');
                while (dateEnd > dateStart || dateStart.format('M') === dateEnd.format('M')) {
                    lastLegend.push(dateStart.format('MMM'));
                    dateStart.add(1, 'month');
                }
            } else {
                config.lastYear.startDate = moment(activeFinancialYear.financialYearStarts, 'DD-MM-YYYY').startOf('year').subtract(2, 'year').format('DD-MM-YYYY');
                config.lastYear.endDate = moment(activeFinancialYear.financialYearStarts, 'DD-MM-YYYY').endOf('year').subtract(2, 'year').format('DD-MM-YYYY');
                config.lastYear.lable = 'FY-' + moment(config.lastYear.startDate, 'DD-MM-YYYY').startOf('year').subtract(2, 'year').format('YY') + ' - FY-' + moment(config.lastYear.endDate, 'DD-MM-YYYY').endOf('year').subtract(2, 'year').format('YY');

                let dateStart = moment(config.lastYear.startDate, 'DD-MM-YYYY');
                let dateEnd = moment(config.lastYear.endDate, 'DD-MM-YYYY');
                while (dateEnd > dateStart || dateStart.format('M') === dateEnd.format('M')) {
                    lastLegend.push(dateStart.format('MMM'));
                    dateStart.add(1, 'month');
                }
            }
            config.legend = _.uniq(activeLegend.concat(lastLegend));
            return config;
        }
        case ChartFilterType.LastYear: // Last Year
            config.ChartTitle = 'Last Year';
            config.activeYear.startDate = moment().startOf('year').subtract(1, 'year').format('DD-MM-YYYY');
            config.activeYear.endDate = moment().endOf('year').subtract(1, 'year').format('DD-MM-YYYY');
            config.activeYear.lable = moment().startOf('year').subtract(1, 'year').format('YYYY');

            config.lastYear.startDate = moment(config.activeYear.startDate, 'DD-MM-YYYY').startOf('year').subtract(1, 'year').format('DD-MM-YYYY');
            config.lastYear.endDate = moment(config.activeYear.endDate, 'DD-MM-YYYY').endOf('year').subtract(1, 'year').format('DD-MM-YYYY');
            config.lastYear.lable = moment(config.activeYear.startDate, 'DD-MM-YYYY').startOf('year').subtract(1, 'year').format('YYYY');

            config.legend = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            return config;
        case ChartFilterType.Custom:
            config.ChartTitle = 'Custom';

            config.activeYear.startDate = customFilterObj.activeYear.startDate;
            config.activeYear.endDate = customFilterObj.activeYear.endDate;
            config.activeYear.lable = `${customFilterObj.activeYear.startDate.slice(0, 5)} / ${customFilterObj.activeYear.endDate.slice(0, 5)}`;

            config.lastYear.startDate = customFilterObj.lastYear.startDate;
            config.lastYear.endDate = customFilterObj.lastYear.startDate;
            config.lastYear.lable = `${customFilterObj.lastYear.startDate.slice(0, 5)} / ${customFilterObj.lastYear.endDate.slice(0, 5)}`;

            config.legend = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            return config;
        default:
            return config;
    }
};
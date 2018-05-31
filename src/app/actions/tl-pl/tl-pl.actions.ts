import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {TlPlService} from '../../services/tl-pl.service';
import {AccountDetails, TrialBalanceRequest} from '../../models/api-models/tb-pl-bs';
import {CustomActions} from '../../store/customActions';
import {TlPlConst} from './tl-pl.const';
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
}

import { Injectable } from "@angular/core";
import { Actions, Effect } from "@ngrx/effects";
import { TlPlService } from "../../services/tl-pl.service";
import { TrialBalanceRequest, AccountDetails } from "../../models/api-models/tb-pl-bs";
import { CustomActions } from "../../store/customActions";
import { TlPlConst } from "./tl-pl.const";
import { Observable } from "rxjs/Observable";
import { Action } from "@ngrx/store";
import { BaseResponse } from "../../models/api-models/BaseResponse";
import { GroupService } from "../../services/group.service";
import { FlattenGroupsAccountsResponse } from "../../models/api-models/Group";
import {TransactionsRequest, TransactionsResponse} from '../../models/api-models/Ledger';
import {LedgerService} from '../../services/ledger.service';

@Injectable()
export class TBPlBsActions {

    @Effect()
    private GetTrialBalance$: Observable<CustomActions> = this.action$
        .ofType(TlPlConst.GET_TRIAL_BALANCE_REQUEST)
        .switchMap((action: CustomActions) => {
            return this._tlPlService.GetTrailBalance(action.payload)
                .map((r: BaseResponse<AccountDetails, TrialBalanceRequest>) => {
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
            return {
                type: TlPlConst.GET_ACC_TRANSACTION_RESPONSE,
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
            return {
                type: TlPlConst.GET_MORE_ACC_TRANSACTION_RESPONSE,
                payload: res.status === 'success' ? res.body : null
            }
        });

    constructor(private action$: Actions, private _tlPlService: TlPlService, private _groupService: GroupService, private _ledgerService: LedgerService) {

    }

    public GetTrialBalance(request: TrialBalanceRequest): CustomActions {
        return {
            type: TlPlConst.GET_TRIAL_BALANCE_REQUEST,
            payload: request
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

    public GetMoreTransactions(request: TransactionsRequest): CustomActions {
        return {
            type: TlPlConst.GET_MORE_ACC_TRANSACTION,
            payload: request
        };
    }
}

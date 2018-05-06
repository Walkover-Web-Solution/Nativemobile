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

    constructor(private action$: Actions, private _tlPlService: TlPlService, private _groupService: GroupService) {

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
}

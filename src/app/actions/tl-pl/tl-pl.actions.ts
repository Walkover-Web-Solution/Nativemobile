import { Injectable } from "@angular/core";
import { Actions, Effect } from "@ngrx/effects";
import { TlPlService } from "../../services/tl-pl.service";
import { TrialBalanceRequest, AccountDetails } from "../../models/api-models/tb-pl-bs";
import { CustomActions } from "../../store/customActions";
import { TlPlConst } from "./tl-pl.const";
import { Observable } from "rxjs/Observable";
import { Action } from "@ngrx/store";
import { BaseResponse } from "../../models/api-models/BaseResponse";

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
                        payload: r
                    };
                });
        });

    constructor(private action$: Actions, private _tlPlService: TlPlService) {

    }

    public GetTrialBalance(request: TrialBalanceRequest): CustomActions {
        return {
            type: TlPlConst.GET_TRIAL_BALANCE_REQUEST,
            payload: request
        };
    }
}

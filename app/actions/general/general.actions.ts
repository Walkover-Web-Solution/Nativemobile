import { Injectable } from "@angular/core";
import { CustomActions } from "~/store/customActions";
import { GeneralConst } from "~/actions/general/general.const";
import { contriesWithCodes } from "~/shared/static-data/countryWithCodes";
import { States } from "~/models/api-models/Company";
import { BaseResponse } from "~/models/api-models/BaseResponse";
import { Effect, Actions } from "@ngrx/effects";
import { Observable } from "rxjs/Observable";
import { CompanyService } from "~/services/companyService.service";

@Injectable()
export class GeneralActions {

  @Effect()
  public getAllState$: Observable<CustomActions> = this.action$
    .ofType(GeneralConst.GET_ALL_STATES)
    .switchMap(() => this._companyService.getAllStates())
    .map(resp => this.setStatesData(resp));

  constructor(private action$: Actions, private _companyService: CompanyService) {
    //
  }

  public setCountriesWithCodes(): CustomActions {
    return {
      type: GeneralConst.SET_COUNTRIES_WITH_CODES,
      payload: contriesWithCodes
    }
  }

  public getStatesData(): CustomActions {
    return {
      type: GeneralConst.GET_ALL_STATES,
    };
  }

  public setStatesData(value: BaseResponse<States[], string>): CustomActions {
    return {
      type: GeneralConst.GET_ALL_STATES_RESPONSE,
      payload: value
    }
  }
}

import { Injectable } from "@angular/core";
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from "rxjs/Observable";

import { BaseResponse } from "../../models/api-models/BaseResponse";
import { CustomActions } from "../../store/customActions";
import { LoginConstants } from "./login.const";

@Injectable()

export class LoginActions {
  constructor(private action$: Actions) {

  }
  public login(value: string): CustomActions {
    return {
      type: LoginConstants.LOGIN_SUCCESS
    }
  }

  private validateResponse<TResponse, TRequest>(response: BaseResponse<TResponse, TRequest>, successAction: CustomActions, showToast: boolean = false, errorAction: CustomActions = { type: 'EmptyAction' }): CustomActions {
    if (response.status === 'error') {
      if (showToast) {
        // this._toasty.errorToast(response.message);
      }
      return errorAction;
    } else {
      if (showToast && typeof response.body === 'string') {
        // this._toasty.successToast(response.body);
      }
    }
    return successAction;
  }
}

import { Injectable } from "@angular/core";
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from "rxjs/Observable";

import { BaseResponse } from "../../models/api-models/BaseResponse";
import { CustomActions } from "../../store/customActions";
import { LoginConstants } from "./login.const";
import { AuthenticationService } from "../../services/authentication.service";
import { SignUpWithPassword, LoginWithPassword } from "../../models/api-models/Login";
import { VerifyMobileResponseModel } from "../../models/api-models/loginModels";
import * as dialogs from "ui/dialogs";

@Injectable()

export class LoginActions {

  @Effect()
  public signUp$: Observable<CustomActions> = this.actions$
    .ofType(LoginConstants.SIGNUP_REQUEST)
    .switchMap((action: CustomActions) =>
      this._authService.SignupWithPassword(action.payload))
    .map(response => {
      let res: BaseResponse<VerifyMobileResponseModel, SignUpWithPassword> = response;
      if (res.status === 'error') {
        dialogs.alert(res.message);
        return { type: '' }
      } else {
        return this.signUpResponse(res);
      }
    });

  @Effect()
  public loginWithPassword$: Observable<CustomActions> = this.actions$
    .ofType(LoginConstants.LOGIN_WITH_PASSWORD_REQUEST)
    .switchMap((action: CustomActions) =>
      this._authService.LoginWithPassword(action.payload))
    .map(response => {
      let res: BaseResponse<VerifyMobileResponseModel, LoginWithPassword> = response;
      if (res.status === 'success') {
        dialogs.alert('login success');
        return this.loginWithPasswordResponse(res);
      } else {
        dialogs.alert('login error');
        return { type: '' }
      }
    });
  constructor(private actions$: Actions, private _authService: AuthenticationService) {

  }

  public signUp(value: SignUpWithPassword): CustomActions {
    return {
      type: LoginConstants.SIGNUP_REQUEST,
      payload: value
    }
  }

  public loginWithPassword(value: LoginWithPassword): CustomActions {
    return {
      type: LoginConstants.LOGIN_WITH_PASSWORD_REQUEST,
      payload: value
    }
  }

  public signUpResponse(response: BaseResponse<VerifyMobileResponseModel, SignUpWithPassword>): CustomActions {
    return {
      type: LoginConstants.SIGNUP_RESPONSE,
      payload: response
    }
  }

  public loginWithPasswordResponse(response: BaseResponse<VerifyMobileResponseModel, LoginWithPassword>): CustomActions {
    return {
      type: LoginConstants.LOGIN_WITH_PASSWORD_RESPONSE,
      payload: response
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

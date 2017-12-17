import { Injectable } from "@angular/core";
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from "rxjs/Observable";

import { BaseResponse } from "../../models/api-models/BaseResponse";
import { CustomActions } from "../../store/customActions";
import { LoginConstants } from "./login.const";
import { AuthenticationService } from "../../services/authentication.service";
import { SignUpWithPassword, LoginWithPassword } from "../../models/api-models/Login";
import { VerifyMobileResponseModel, SignupWithMobile, VerifyMobileModel, VerifyEmailModel, VerifyEmailResponseModel } from "../../models/api-models/loginModels";
import * as dialogs from "ui/dialogs";
import { action } from "ui/dialogs";

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

  @Effect()
  public signupWithMobile$: Observable<CustomActions> = this.actions$
    .ofType(LoginConstants.SIGNUP_WITH_MOBILE_REQUEST)
    .switchMap((action: CustomActions) => this._authService.SignupWithMobile(action.payload))
    .map(response => {
      if (response.status === 'success') {
        return this.signupWithMobileResponce(response);
      } else {
        dialogs.alert('something went wrong please try again');
        return { type: '' }
      }
    });

  @Effect()
  public verifyMobile$: Observable<CustomActions> = this.actions$
    .ofType(LoginConstants.VERIFY_MOBILE_REQUEST)
    .switchMap((action: CustomActions) =>
      this._authService.VerifyOTP(action.payload as VerifyMobileModel)
    )
    .map(response => {
      let res: BaseResponse<VerifyMobileResponseModel, VerifyMobileModel> = response;
      if (res.status === 'success') {
        dialogs.alert('login success');
        return this.verifyMobileResponce(res);
      } else {
        dialogs.alert('login error');
      }
      return {
        type: ''
      }
    });


  @Effect()
  public signupWithEmail$: Observable<CustomActions> = this.actions$
    .ofType(LoginConstants.SIGNUP_WITH_EMAIL_REQUEST)
    .switchMap((action: CustomActions) => this._authService.SignupWithEmail(action.payload))
    .map(response => {
      if (response.status === 'success') {
        return this.signupWithEmailResponce(response);
      } else {
        dialogs.alert('something went wrong please try again');
        return { type: '' }
      }
    });

  @Effect()
  public verifyEmail$: Observable<CustomActions> = this.actions$
    .ofType(LoginConstants.VERIFY_EMAIL_REQUEST)
    .switchMap((action: CustomActions) =>
      this._authService.VerifyEmail(action.payload as VerifyEmailModel)
    )
    .map(response => {
      let res: BaseResponse<VerifyEmailResponseModel, VerifyEmailModel> = response;
      if (res.status === 'success') {
        dialogs.alert('login success');
        return this.verifyEmailResponce(res);
      } else {
        dialogs.alert('login error');
      }
      return {
        type: ''
      }
    });

    @Effect()
  public verifyTwoWayAuth$: Observable<CustomActions> = this.actions$
    .ofType(LoginConstants.VERIFY_TWOWAYAUTH_REQUEST)
    .switchMap((action: CustomActions) =>
      this._authService.VerifyOTP(action.payload as VerifyMobileModel)
    )
    .map(response => {
      let res: BaseResponse<VerifyMobileResponseModel, VerifyMobileModel> = response;
      if (res.status === 'success') {
        dialogs.alert('login success');
        return this.verifyTwoWayAuthResponse(res);
      } else {
        dialogs.alert('login error');
      }
      return {
        type: ''
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

  public signUpResponse(response: BaseResponse<VerifyMobileResponseModel, SignUpWithPassword>): CustomActions {
    return {
      type: LoginConstants.SIGNUP_RESPONSE,
      payload: response
    }
  }

  public loginWithPassword(value: LoginWithPassword): CustomActions {
    return {
      type: LoginConstants.LOGIN_WITH_PASSWORD_REQUEST,
      payload: value
    }
  }

  public loginWithPasswordResponse(response: BaseResponse<VerifyMobileResponseModel, LoginWithPassword>): CustomActions {
    return {
      type: LoginConstants.LOGIN_WITH_PASSWORD_RESPONSE,
      payload: response
    }
  }

  public signupWithMobileRequest(value: SignupWithMobile): CustomActions {
    return {
      type: LoginConstants.SIGNUP_WITH_MOBILE_REQUEST,
      payload: value
    };
  }

  public signupWithMobileResponce(value: BaseResponse<string, SignupWithMobile>): CustomActions {
    return {
      type: LoginConstants.SIGNUP_WITH_MOBILE_RESPONCE,
      payload: value
    };
  }
  public verifyMobileRequest(value: VerifyMobileModel): CustomActions {
    return {
      type: LoginConstants.VERIFY_MOBILE_REQUEST,
      payload: value
    };
  }

  public verifyMobileResponce(value: BaseResponse<VerifyMobileResponseModel, VerifyMobileModel>): CustomActions {
    return {
      type: LoginConstants.VERIFY_MOBILE_RESPONCE,
      payload: value
    };
  }


  public signupWithEmailRequest(value: string): CustomActions {
    return {
      type: LoginConstants.SIGNUP_WITH_EMAIL_REQUEST,
      payload: value
    };
  }

  public signupWithEmailResponce(value: BaseResponse<string, string>): CustomActions {
    return {
      type: LoginConstants.SIGNUP_WITH_EMAIL_RESPONCE,
      payload: value
    };
  }

  public verifyEmailRequest(value: VerifyEmailModel): CustomActions {
    return {
      type: LoginConstants.VERIFY_EMAIL_REQUEST,
      payload: value
    };
  }

  public verifyEmailResponce(value: BaseResponse<VerifyEmailResponseModel, VerifyEmailModel>): CustomActions {
    return {
      type: LoginConstants.VERIFY_EMAIL_RESPONCE,
      payload: value
    };
  }

  public verifyTwoWayAuthRequest(value: VerifyMobileModel): CustomActions {
    return {
      type: LoginConstants.VERIFY_TWOWAYAUTH_REQUEST,
      payload: value
    };
  }

  public verifyTwoWayAuthResponse(value: BaseResponse<VerifyMobileResponseModel, VerifyMobileModel>): CustomActions {
    return {
      type: LoginConstants.VERIFY_TWOWAYAUTH_RESPONSE,
      payload: value
    };
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

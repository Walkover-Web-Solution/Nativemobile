import { CustomActions } from '../customActions';
import { LoginConstants } from '../../actions/login/login.const';
import { VerifyEmailResponseModel, VerifyMobileResponseModel } from '../../models/api-models/loginModels';
import { LoginWithPassword, SignUpWithPassword } from '../../models/api-models/Login';
import { BaseResponse } from '../../models/api-models/BaseResponse';

export interface LoginState {
  isSignupInProcess: boolean;
  isSignUpSuccess: boolean;
  isLoginWithPasswordInProcess: boolean;
  isLoginWithPasswordSuccess: boolean;
  user: VerifyEmailResponseModel;
}

const initialState: LoginState = {
  isSignupInProcess: false,
  isSignUpSuccess: false,
  isLoginWithPasswordInProcess: false,
  isLoginWithPasswordSuccess: false,
  user: null
}

export function LoginReducer(state: LoginState = initialState, action: CustomActions): LoginState {
  switch (action.type) {
    case LoginConstants.LOGIN_WITH_PASSWORD_REQUEST:
      return {
        ...state,
        isLoginWithPasswordInProcess: true
      }
    case LoginConstants.LOGIN_WITH_PASSWORD_RESPONSE: {
      let res: BaseResponse<VerifyMobileResponseModel, LoginWithPassword> = action.payload;
      if (action.payload.status === 'success') {
        return {
          ...state,
          user: res.body,
          isLoginWithPasswordInProcess: false,
          isLoginWithPasswordSuccess: true
        }
      }
      return {
        ...state,
        isLoginWithPasswordInProcess: false,
        isLoginWithPasswordSuccess: false
      }
    }

    case LoginConstants.SIGNUP_REQUEST:
      return {
        ...state,
        isSignupInProcess: true
      }
    case LoginConstants.SIGNUP_RESPONSE: {
      let res: BaseResponse<VerifyMobileResponseModel, SignUpWithPassword> = action.payload;
      if (action.payload.status === 'success') {
        return {
          ...state,
          isSignupInProcess: false,
          isSignUpSuccess: true
        }
      }
      return {
        ...state,
        isSignupInProcess: false,
        isSignUpSuccess: false
      }
    }
    case LoginConstants.RESET_LOGIN_STATE:
      return initialState;

    default:
      return state;
  }
}

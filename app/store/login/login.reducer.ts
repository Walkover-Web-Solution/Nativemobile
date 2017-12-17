import { CustomActions } from '../customActions';
import { LoginConstants } from '../../actions/login/login.const';
import { VerifyEmailResponseModel, VerifyMobileResponseModel, VerifyMobileModel } from '../../models/api-models/loginModels';
import { LoginWithPassword, SignUpWithPassword } from '../../models/api-models/Login';
import { BaseResponse } from '../../models/api-models/BaseResponse';

export interface LoginState {
  isSignupInProcess: boolean;
  isSignUpSuccess: boolean;
  isLoginWithPasswordInProcess: boolean;
  isLoginWithPasswordSuccess: boolean;
  isLoginWithMobileInProcess: boolean;
  isLoginWithMobileSubmited: boolean;
  isVerifyMobileInProcess: boolean;
  isVerifyMobileSuccess: boolean;
  isLoginWithEmailInProcess: boolean;
  isLoginWithEmailSubmited: boolean;
  isVerifyEmailInProcess: boolean;
  isVerifyEmailSuccess: boolean;
  isTwoWayAuthInProcess: boolean;
  isTwoWayAuthSuccess: boolean;
  user: VerifyEmailResponseModel;
}

const initialState: LoginState = {
  isSignupInProcess: false,
  isSignUpSuccess: false,
  isLoginWithPasswordInProcess: false,
  isLoginWithPasswordSuccess: false,
  user: null,
  isLoginWithMobileInProcess: false,
  isLoginWithMobileSubmited: false,
  isVerifyMobileInProcess: false,
  isVerifyMobileSuccess: false,
  isLoginWithEmailInProcess: false,
  isLoginWithEmailSubmited: false,
  isVerifyEmailInProcess: false,
  isVerifyEmailSuccess: false,
  isTwoWayAuthInProcess: false,
  isTwoWayAuthSuccess: false
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

    case LoginConstants.SIGNUP_WITH_MOBILE_REQUEST:
      return {
        ...state,
        isLoginWithMobileInProcess: true
      };
    case LoginConstants.SIGNUP_WITH_MOBILE_RESPONCE:
      if (action.payload.status === 'success') {
        return {
          ...state,
          isLoginWithMobileSubmited: true,
          isLoginWithMobileInProcess: false
        };
      }
      return {
        ...state,
        isLoginWithMobileSubmited: false,
        isLoginWithMobileInProcess: false
      };

    case LoginConstants.VERIFY_MOBILE_REQUEST:
      return {
        ...state,
        isVerifyMobileInProcess: true
      };

    case LoginConstants.VERIFY_MOBILE_RESPONCE: {
      let data1: BaseResponse<VerifyMobileResponseModel, VerifyMobileModel> = action.payload;
      if (data1.status === 'success') {
        return {
          ...state,
          isVerifyMobileInProcess: false,
          isVerifyMobileSuccess: true,
        };
      } else {
        return {
          ...state,
          isVerifyMobileInProcess: false,
          isVerifyMobileSuccess: false
        };
      }
    }

    case LoginConstants.VERIFY_TWOWAYAUTH_REQUEST: {
      return {
        ...state,
        isTwoWayAuthInProcess: true
      };
    }
    case LoginConstants.VERIFY_TWOWAYAUTH_RESPONSE: {
      if (action.payload.status === 'success') {
        return {
          ...state,
          isTwoWayAuthInProcess: false,
          isTwoWayAuthSuccess: true
        };
      }
      return {
        ...state,
        isTwoWayAuthInProcess: false,
        isTwoWayAuthSuccess: false
      };
    }

    case LoginConstants.SIGNUP_WITH_EMAIL_REQUEST:
      return {
        ...state,
        isLoginWithEmailInProcess: true
      };
    case LoginConstants.SIGNUP_WITH_EMAIL_RESPONCE:
      if (action.payload.status === 'success') {
        return {
          ...state,
          isLoginWithEmailSubmited: true,
          isLoginWithEmailInProcess: false
        };
      }
      return {
        ...state,
        isLoginWithEmailSubmited: false,
        isLoginWithEmailInProcess: false
      };

    case LoginConstants.VERIFY_EMAIL_REQUEST:
      return {
        ...state,
        isVerifyEmailInProcess: true
      };

    case LoginConstants.VERIFY_EMAIL_RESPONCE:
      let data1: BaseResponse<VerifyMobileResponseModel, VerifyMobileModel> = action.payload;
      if (data1.status === 'success') {
        return {
          ...state,
          isVerifyEmailInProcess: false,
          isVerifyEmailSuccess: true,
        };
      } else {
        return {
          ...state,
          isVerifyEmailInProcess: false,
          isVerifyMobileSuccess: false
        };
      }
    case LoginConstants.RESET_LOGIN_STATE:
      return initialState;

    default:
      return state;
  }
}

import { CustomActions } from '../customActions';
import { VerifyEmailResponseModel, VerifyMobileResponseModel, VerifyMobileModel, VerifyEmailModel } from '../../models/api-models/loginModels';
import { LoginConstants } from '../../actions/login/login.const';
import { BaseResponse } from '../../models/api-models/BaseResponse';
import { LoginWithPassword } from '../../models/api-models/Login';
export interface SessionState {
  user: VerifyEmailResponseModel
}

const initialState: SessionState = {
  user: null
}

export function SessionReducer(state: SessionState = initialState, action: CustomActions): SessionState {
  switch (action.type) {

    case LoginConstants.SET_INITIAL_SESSION_STATE:
      return action.payload;
    case LoginConstants.LOGIN_WITH_PASSWORD_RESPONSE: {
      let resp: BaseResponse<VerifyMobileResponseModel, LoginWithPassword> = action.payload;
      if (resp.status === 'success') {
        return Object.assign({}, state, {
          user: resp.body
        });
      } else {
        return Object.assign({}, state, {
          user: null
        });
      }
    }
    case LoginConstants.VERIFY_MOBILE_RESPONCE: {
      let resp: BaseResponse<VerifyMobileResponseModel, VerifyMobileModel> = action.payload;
      if (resp.status === 'success') {
        return Object.assign({}, state, {
          user: resp.body
        });
      } else {
        return Object.assign({}, state, {
          user: null
        });
      }
    }

    case LoginConstants.VERIFY_EMAIL_RESPONCE: {
      let data: BaseResponse<VerifyEmailResponseModel, VerifyEmailModel> = action.payload;
      if (data.status === 'success') {
        return Object.assign({}, state, {
          user: data.body
        });
      } else {
        return Object.assign({}, state, {
          user: null
        });
      }
    }

    case LoginConstants.VERIFY_TWOWAYAUTH_RESPONSE: {
      let data1: BaseResponse<VerifyMobileResponseModel, VerifyMobileModel> = action.payload;
      if (data1.status === 'success') {
        return Object.assign({}, state, {
          user: data1.body
        });
      }
      return state;
    }

    case LoginConstants.LOGOUT: {
      return {
        ...state,
        user: null
      }
    }
    default:
      return state;
  }
}

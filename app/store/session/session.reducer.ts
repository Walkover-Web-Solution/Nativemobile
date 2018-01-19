import { CustomActions } from '../customActions';
import { VerifyEmailResponseModel, VerifyMobileResponseModel, VerifyMobileModel, VerifyEmailModel } from '../../models/api-models/loginModels';
import { LoginConstants } from '../../actions/login/login.const';
import { BaseResponse } from '../../models/api-models/BaseResponse';
import { LoginWithPassword } from '../../models/api-models/Login';
import { CompanyResponse, StateDetailsResponse, TaxResponse } from '../../models/api-models/Company';
import { CompanyConstants } from '~/actions/company/company.const';

export enum userLoginStateEnum {
  notLoggedIn,
  userLoggedIn,
  needTwoWayAuth
}

export interface SessionState {
  user: VerifyEmailResponseModel,
  companyUniqueName: string;                   // current user | null
  companies: CompanyResponse[];
  lastState: string;
  taxes: TaxResponse[];
  userLoginState: userLoginStateEnum;
}

const initialState: SessionState = {
  user: null,
  companyUniqueName: '',
  companies: [],
  lastState: '',
  taxes: null,
  userLoginState: userLoginStateEnum.notLoggedIn
}

export function SessionReducer(state: SessionState = initialState, action: CustomActions): SessionState {
  switch (action.type) {
    case 'Error': {
      return state;
    }
    case LoginConstants.SET_INITIAL_SESSION_STATE:
      return action.payload;
    case LoginConstants.LOGIN_WITH_PASSWORD_RESPONSE: {
      let resp: BaseResponse<VerifyMobileResponseModel, LoginWithPassword> = action.payload;
      if (resp.status === 'success') {
        return Object.assign({}, state, {
          user: resp.body,
          userLoginState: userLoginStateEnum.userLoggedIn
        });
      } else {
        return Object.assign({}, state, {
          user: null,
          userLoginState: userLoginStateEnum.notLoggedIn
        });
      }
    }
    case LoginConstants.VERIFY_MOBILE_RESPONCE: {
      let resp: BaseResponse<VerifyMobileResponseModel, VerifyMobileModel> = action.payload;
      if (resp.status === 'success') {
        return Object.assign({}, state, {
          user: resp.body,
          userLoginState: userLoginStateEnum.userLoggedIn
        });
      } else {
        return Object.assign({}, state, {
          user: null,
          userLoginState: userLoginStateEnum.notLoggedIn
        });
      }
    }

    case LoginConstants.VERIFY_EMAIL_RESPONCE: {
      let data: BaseResponse<VerifyEmailResponseModel, VerifyEmailModel> = action.payload;
      if (data.status === 'success') {
        return Object.assign({}, state, {
          user: data.body,
          userLoginState: userLoginStateEnum.userLoggedIn
        });
      } else {
        return Object.assign({}, state, {
          user: null,
          userLoginState: userLoginStateEnum.notLoggedIn
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

    case LoginConstants.SIGNUP_WITH_GOOGLE_RESPONSE: {
      let data: BaseResponse<VerifyEmailResponseModel, string> = action.payload;
      if (data.status === 'success') {
        return Object.assign({}, state, {
          user: data.body,
          userLoginState: userLoginStateEnum.userLoggedIn
        });
      } else {
        return Object.assign({}, state, {
          user: null,
          userLoginState: userLoginStateEnum.notLoggedIn
        });
      }
    }

    case CompanyConstants.REFRESH_COMPANIES_RESPONSE: {
      let companies: BaseResponse<CompanyResponse[], string> = action.payload;
      if (companies.status === 'success') {
        return Object.assign({}, state, {
          companies: companies.body
        });
      }
      return state;
    }

    case CompanyConstants.CHANGE_COMPANY_RESPONSE: {
      let stateData: BaseResponse<StateDetailsResponse, string> = action.payload;
      if (stateData.status === 'success') {
        return Object.assign({}, state, {
          companyUniqueName: stateData.body.companyUniqueName,
          lastState: stateData.body.lastState
        });
      }
      return state;
    }

    case CompanyConstants.GET_COMPANY_TAX_RESPONSE: {
      if (action.payload.status === 'success') {
        return Object.assign({}, state, {
          taxes: action.payload.body
        });
      }
    }

    case LoginConstants.LOGOUT: {
      return initialState;
    }
    default:
      return state;
  }
}

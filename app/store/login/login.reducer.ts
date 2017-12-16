import { CustomActions } from '../customActions';
import { LoginConstants } from '../../actions/login/login.const';

export interface LoginState {
  isLogeedInProcess: boolean;
}

const initialState: LoginState = {
  isLogeedInProcess: false
}

export function LoginReducer(state: LoginState = initialState, action: CustomActions): LoginState {
  switch (action.type) {
    case LoginConstants.LOGIN_SUCCESS:
      return {
        ...state,
        isLogeedInProcess: true
      }
    default:
      return state;
  }
}

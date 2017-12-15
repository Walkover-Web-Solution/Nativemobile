import { CustomActions } from '../customActions';

export interface LoginState {
  isLogeedInProcess: boolean;
}

const initialState: LoginState = {
  isLogeedInProcess: false
}

export function LoginReducer(state: LoginState = initialState, action: CustomActions): LoginState {
  switch (action.type) {
    default:
      return state;
  }
}

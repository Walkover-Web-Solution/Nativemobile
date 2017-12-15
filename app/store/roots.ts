import { ActionReducerMap } from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';

import * as fromLogin from './login/login.reducer';
import * as fromSession from './session/session.reducer';

export interface AppState {
  router: fromRouter.RouterReducerState;
  login: fromLogin.LoginState;
  session: fromSession.SessionState;
}

export const reducers: ActionReducerMap<AppState> = {
  router: fromRouter.routerReducer,
  login: fromLogin.LoginReducer,
  session: fromSession.SessionReducer
};

import { ActionReducerMap } from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';

import * as fromLogin from './login/login.reducer';
import * as fromSession from './session/session.reducer';
import * as fromGeneral from './general/general.reducer';
import * as fromDashboard from './dashboard/dashboard.reducer';

export interface AppState {
  router: fromRouter.RouterReducerState;
  login: fromLogin.LoginState;
  session: fromSession.SessionState;
  general: fromGeneral.GeneralState;
  dashboard: fromDashboard.DashboardState;
}

export const reducers: ActionReducerMap<AppState> = {
  router: fromRouter.routerReducer,
  login: fromLogin.LoginReducer,
  session: fromSession.SessionReducer,
  general: fromGeneral.GeneralReducer,
  dashboard: fromDashboard.DashboardReducer
};

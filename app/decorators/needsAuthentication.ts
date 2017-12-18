import { AppState } from '../store';
import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { RouterExtensions } from 'nativescript-angular/router';
import { LoginActions } from '../actions/login/login.action';


@Injectable()
export class NeedsAuthentication implements CanActivate {
  constructor(private _router: Router, private store: Store<AppState>, private routerExtensions: RouterExtensions, private _loginActions: LoginActions) {
  }

  public canActivate() {
    return this.store.select(s => s.session).select(session => {
      if (session && session.user) {
        return true;
      } else {
        this._router.navigate(['/login']);
      }
    });
  }
}

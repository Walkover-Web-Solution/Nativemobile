import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { VerifyEmailResponseModel } from '../models/api-models/loginModels';
import { AppState } from '../store';
import { Store } from '@ngrx/store';
import { RouterExtensions } from 'nativescript-angular/router';
import { LoginActions } from '../actions/login/login.action';
import { Router } from '@angular/router';

@Component({
  selector: 'ns-home',
  moduleId: module.id,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  public userStream$: Observable<VerifyEmailResponseModel>;
  constructor(private store: Store<AppState>, private routerExtensions: RouterExtensions, private _loginActions: LoginActions) {
    this.userStream$ = this.store.select(s => s.session.user);
  }

  public ngOnInit(): void {

  }

  public logout() {
    this.store.dispatch(this._loginActions.logout());
    this.routerExtensions.navigateByUrl('/login', { clearHistory: true });
  }
  public ngOnDestroy(): void {
    // this.lo
  }
}

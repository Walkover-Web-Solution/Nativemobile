import { Component, OnInit, OnDestroy } from '@angular/core';
import { topmost } from 'ui/frame';
import { isIOS } from 'platform';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store';
import { Observable } from 'rxjs/Observable';
import { LoginActions } from '../../../actions/login/login.action';

@Component({
  selector: 'ns-login',
  moduleId: module.id,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  public loginProcess$: Observable<boolean>;
  constructor(private store: Store<AppState>, private _loginActions: LoginActions) {
    this.loginProcess$ = this.store.select(p => p.login.isLogeedInProcess);
   }

  public ngOnInit(): void {
    // this.items = this.itemService.getItems();
  }
  public ngOnDestroy(): void {
    console.log('login destroyed');
  }

  public onLogin() {
    this.store.dispatch(this._loginActions.login());
  }
}

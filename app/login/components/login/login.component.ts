import { Component, OnInit, OnDestroy } from '@angular/core';
import { topmost } from 'ui/frame';
import { Page, Color } from 'ui/page';
import { AnimationCurve } from 'ui/enums';
import { isIOS } from 'platform';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store';
import { Observable } from 'rxjs/Observable';
import { LoginActions } from '../../../actions/login/login.action';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RouterExtensions } from 'nativescript-angular/router';

@Component({
  selector: 'ns-login',
  moduleId: module.id,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  public loginProcess$: Observable<boolean>;
  public loginSuccess$: Observable<boolean>;
  public loginWithPasswordForm: FormGroup;
  constructor(private _fb: FormBuilder, private store: Store<AppState>, private _loginActions: LoginActions, private routerExtensions: RouterExtensions,
    private page: Page) {
    this.loginProcess$ = this.store.select(s => s.login.isLoginWithPasswordInProcess);
    this.loginSuccess$ = this.store.select(s => s.login.isLoginWithPasswordSuccess);
    this.loginProcess$.subscribe(p => {
      console.log('loader : ' + p);
    });
  }

  public ngOnInit(): void {

    this.loginWithPasswordForm = this._fb.group({
      uniqueKey: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });

    this.page.backgroundColor = new Color(1, 0, 169, 157);
    this.page.backgroundSpanUnderStatusBar = true;
    this.page.actionBarHidden = true;

    this.loginSuccess$.subscribe(s => {
      if (s) {
        this.routerExtensions.navigate(['/home'], { clearHistory: true });
      }
    })
  }
  public ngOnDestroy(): void {
    // this.lo
  }
  public gotoUrl(url: string[], transitionName: string) {
    this.routerExtensions.navigateByUrl('/' + url.join('/'), {
      animated: true,
      transition: {
        name: transitionName,
        curve: AnimationCurve.ease
      }
    });
  }
  public login() {
    let formValues = this.loginWithPasswordForm.value;
    formValues.uniqueKey = formValues.uniqueKey.toLowerCase();
    this.store.dispatch(this._loginActions.loginWithPassword(this.loginWithPasswordForm.value));
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { topmost } from 'ui/frame';
import { Page, Color } from 'ui/page';
import { isIOS } from 'platform';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store';
import { Observable } from 'rxjs/Observable';
import { LoginActions } from '../../../actions/login/login.action';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { VerifyEmailModel } from '../../../models/api-models/loginModels';
import { RouterExtensions } from 'nativescript-angular/router';
import { AnimationCurve } from 'ui/enums';

@Component({
  selector: 'ns-login-with-email',
  moduleId: module.id,
  templateUrl: './login-with-email.component.html',
  styleUrls: ['./login-with-email.component.scss']
})
export class LoginWithEmailComponent implements OnInit, OnDestroy {
  public isLoginWithEmailInProcess$: Observable<boolean>;
  public isVerifyEmailSuccess$: Observable<boolean>;
  public isLoginWithEmailSubmited$: Observable<boolean>;
  public emailVerifyForm: FormGroup;
  constructor(private _fb: FormBuilder, private store: Store<AppState>, private _loginActions: LoginActions, private routerExtensions: RouterExtensions, private page: Page) {
    this.isLoginWithEmailInProcess$ = this.store.select(s => s.login.isLoginWithEmailInProcess);
    this.isVerifyEmailSuccess$ = this.store.select(s => s.login.isVerifyEmailSuccess);
    this.isLoginWithEmailSubmited$ = this.store.select(s => s.login.isLoginWithEmailSubmited);
  }

  public ngOnInit(): void {

    this.emailVerifyForm = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
      token: ['', Validators.required]
    });

    this.page.backgroundColor = new Color(1, 0, 169, 157);
    this.page.backgroundSpanUnderStatusBar = true;
    this.page.actionBarHidden = true;

    this.isVerifyEmailSuccess$.subscribe(s => {
      if (s) {
        this.routerExtensions.navigate(['/home'], { clearHistory: true });
      }
    })
  }
  public ngOnDestroy(): void {
    // this.lo
  }

  public loginWithEmail() {
    let emailForm = this.emailVerifyForm;
    console.log('email :' + emailForm.value.email)
    this.store.dispatch(this._loginActions.signupWithEmailRequest(emailForm.value.email.toLowerCase()));
  }

  public verifyEmail() {
    let emailForm = this.emailVerifyForm;
    let data = new VerifyEmailModel();
    data.email = emailForm.value.email.toLowerCase();
    data.verificationCode = emailForm.value.token;
    this.store.dispatch(this._loginActions.verifyEmailRequest(data));
  }

  public backToLogin() {
    this.routerExtensions.navigate(['/login'], {
      clearHistory: true, animated: true,
      transition: {
        name: 'slideRight',
        curve: AnimationCurve.ease
      }
    });
  }
}

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
import * as SocialLogin from "nativescript-social-login";
import * as application from "application";
import * as dialogs from "ui/dialogs";
import { AuthenticationService } from '~/services/authentication.service';

@Component({
  selector: 'ns-login',
  moduleId: module.id,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  public loginProcess$: Observable<boolean>;
  public loginSuccess$: Observable<boolean>;
  public loginWithPasswordForm: FormGroup;
  constructor(private _fb: FormBuilder, private store: Store<AppState>, private _loginActions: LoginActions, private routerExtensions: RouterExtensions,
    private page: Page, private authservice: AuthenticationService) {
    this.loginProcess$ = this.store.select(s => s.login.isLoginWithPasswordInProcess);
    this.loginSuccess$ = this.store.select(s => s.login.isLoginWithPasswordSuccess);
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
    });
    if (application.ios) {
      SocialLogin.init({
        google: {
          initialize: true,
          isRequestAuthCode: true,
          scopes: ["profile", "email"],
          serverClientId: '641015054140-22m4v5kgtpnedfiq4peo9u3vcojmespu.apps.googleusercontent.com',
          shouldFetchBasicProfile: true,
        },
        facebook: {
          initialize: false
        },
        onActivityResult: (requestCode: number, resultCode: number, data: any) => {
          console.log(requestCode);
          console.log(resultCode);
          console.log(JSON.stringify(data));
        }
      });
    }

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
  public googleLogin() {
    SocialLogin.loginWithGoogle((result) => {
      this.authservice.GetAtuhToken(result).subscribe(p => {
        console.log(JSON.stringify(p));
        // this.authservice.LoginWithGoogle(p)
        console.log(JSON.stringify(result));
        console.log("code: " + result.code);
        console.log("error: " + result.error);
        console.log("userToken: " + result.userToken);
        console.log("displayName: " + result.displayName);
        console.log("photo: " + result.photo);
        console.log("authToken: " + result.authToken);
      });

    });
  }
}

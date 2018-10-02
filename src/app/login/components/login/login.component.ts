import {takeUntil} from 'rxjs/operators';
import {Component, OnInit, OnDestroy, AfterViewInit} from '@angular/core';
import {Observable, ReplaySubject} from 'rxjs';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {LoginActions} from '../../../actions/login/login.action';
import {RouterService} from '../../../services/router.service';
import {Store} from '@ngrx/store';
import {AppState} from '../../../store';
import {ToasterService} from '../../../services/toaster.service';
import {AuthService, GoogleLoginProvider, LinkedinLoginProvider} from 'ng4-social-login';
import {SocialUser} from 'ng4-social-login';
import {LinkedInRequestModel} from '../../../models/api-models/loginModels';
import {AuthenticationService} from '../../../services/authentication.service';

@Component({
    selector: 'ns-login',
    moduleId: module.id,
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy, AfterViewInit {
    public loginProcess$: Observable<boolean>;
    public loginSuccess$: Observable<boolean>;
    public loginWithPasswordForm: FormGroup;
    public signupWithGoogleInProcess$: Observable<boolean>;
    public signupWithGoogleSuccess$: Observable<boolean>;
    public signupWithLinkedInInProcess$: Observable<boolean>;
    public signupWithLinkedInSuccess$: Observable<boolean>;
    public isSocialLogoutAttempted$: Observable<boolean>;
    private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

    constructor(private _fb: FormBuilder, private store: Store<AppState>, private _loginActions: LoginActions, private routerExtensions: RouterService,
                private _toaster: ToasterService, private socialAuthService: AuthService, private authServiceLocal: AuthenticationService) {
        this.loginProcess$ = this.store.select(s => s.login.isLoginWithPasswordInProcess).pipe(takeUntil(this.destroyed$));
        this.loginSuccess$ = this.store.select(s => s.login.isLoginWithPasswordSuccess).pipe(takeUntil(this.destroyed$));
        this.signupWithGoogleInProcess$ = this.store.select(s => s.login.isSignupWithGoogleInProcess).pipe(takeUntil(this.destroyed$));
        this.signupWithGoogleSuccess$ = this.store.select(s => s.login.isSignupWithGoogleSuccess).pipe(takeUntil(this.destroyed$));
        this.isSocialLogoutAttempted$ = this.store.select(p => p.login.isSocialLogoutAttempted).pipe(takeUntil(this.destroyed$));
        this.signupWithLinkedInInProcess$ = this.store.select(p => p.login.isSignupWithLinkedInInProcess).pipe(takeUntil(this.destroyed$));
        this.signupWithLinkedInSuccess$ = this.store.select(p => p.login.isSignupWithLinkedInSuccess).pipe(takeUntil(this.destroyed$));
    }


    public ngOnInit(): void {
        this.loginWithPasswordForm = this._fb.group({
            uniqueKey: ['', [Validators.required]],
            password: ['', [Validators.required]],
        });

        this.loginSuccess$.subscribe(s => {
            if (s) {
                (this.routerExtensions.router as any).navigate(['/home']);
            }
        });

        this.signupWithGoogleSuccess$.subscribe(s => {
            if (s) {
                (this.routerExtensions.router as any).navigate(['/home']);
            }
        });

        this.signupWithLinkedInSuccess$.subscribe(s => {
            if (s) {
                (this.routerExtensions.router as any).navigate(['/home']);
            }
        });

        this.socialAuthService.authState.pipe(takeUntil(this.destroyed$)).subscribe((user: SocialUser) => {
            this.isSocialLogoutAttempted$.subscribe((res) => {
                if (!res && user) {
                    switch (user.provider) {
                        case 'GOOGLE': {
                            this.authServiceLocal.LoginWithGoogle(user.token).subscribe(LoginResult => {
                                this.store.dispatch(this._loginActions.signupWithGoogleResponse(LoginResult));
                            }, err => {
                                if (err) {
                                    this._toaster.errorToast('Something Went Wrong! Please Try Again');
                                }
                            });
                            break;
                        }
                        case 'LINKEDIN': {
                            const obj: LinkedInRequestModel = new LinkedInRequestModel();
                            obj.email = user.email;
                            obj.token = user.token;
                            this.authServiceLocal.LoginWithLinkedin(obj).subscribe(LoginResult => {
                                this.store.dispatch(this._loginActions.signupWithLinkedInResponse(LoginResult));
                            }, err => {
                                if (err) {
                                    this._toaster.errorToast('Something Went Wrong! Please Try Again');
                                }
                            });
                            break;
                        }
                        default: {
                            // do something
                            break;
                        }
                    }
                }
            });
        });
    }

    public ngAfterViewInit() {
    }

    public login() {
        const formValues = this.loginWithPasswordForm.value;
        formValues.uniqueKey = formValues.uniqueKey.toLowerCase();
        this.store.dispatch(this._loginActions.loginWithPassword(this.loginWithPasswordForm.value));
    }

    public async signInWithProviders(provider: string) {
        //  web social authentication
        this.store.dispatch(this._loginActions.resetSocialLogoutAttempt());
        if (provider === 'google') {
            this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
        } else if (provider === 'linkedin') {
            this.socialAuthService.signIn(LinkedinLoginProvider.PROVIDER_ID);
        }
    }

    public ngOnDestroy(): void {
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }

}

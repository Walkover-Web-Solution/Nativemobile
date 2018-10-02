import {mergeMap} from 'rxjs/operators';
import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Store} from '@ngrx/store';
import {AppState} from '../../../store';
import {Observable} from 'rxjs';
import {LoginActions} from '../../../actions/login/login.action';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../../services/authentication.service';
import {AnimationCurve, Color, defaultLoaderOptions, isIOS, Page} from '../../../common/utils/environment';
import {ToasterService} from '../../../services/toaster.service';
import {RouterService} from '../../../services/router.service';
import {Config} from '../../../common';

import * as app from 'tns-core-modules/application';
import {LoadingIndicator} from 'nativescript-loading-indicator';
// import {EventData} from 'tns-core-modules/data/observable';
// import {LoadEventData, WebView} from "tns-core-modules/ui/web-view";
// import {isAndroid} from "tns-core-modules/platform"

// let webViewInterfaceModule = require('nativescript-webview-interface');
// import * as platformModule from "tns-core-modules/platform";

@Component({
    selector: 'ns-login',
    moduleId: module.id,
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy, AfterViewInit {
    public loader: LoadingIndicator;
    @ViewChild('myWebView') webViewRef: ElementRef;
    public loginProcess$: Observable<boolean>;
    public loginSuccess$: Observable<boolean>;
    public secondWebViewSRC = '~/www/chart.html';
    public signupWithGoogleInProcess$: Observable<boolean>;
    public signupWithGoogleSuccess$: Observable<boolean>;

    private oLangWebViewInterface;
    public loginWithPasswordForm: FormGroup;

    constructor(private _fb: FormBuilder, private store: Store<AppState>, private _loginActions: LoginActions, private routerExtensions: RouterService,
                private page: Page, private authservice: AuthenticationService, private changeDetectorRef: ChangeDetectorRef,
                private _toaster: ToasterService) {
        this.loginProcess$ = this.store.select(s => s.login.isLoginWithPasswordInProcess);
        this.loginSuccess$ = this.store.select(s => s.login.isLoginWithPasswordSuccess);
        this.signupWithGoogleInProcess$ = this.store.select(s => s.login.isSignupWithGoogleInProcess);
        this.signupWithGoogleSuccess$ = this.store.select(s => s.login.isSignupWithGoogleSuccess);
    }


    public ngOnInit(): void {
        this.loader = new LoadingIndicator();
        this.loginWithPasswordForm = this._fb.group({
            uniqueKey: ['', [Validators.required]],
            password: ['', [Validators.required]],
        });

        if (Config.IS_MOBILE_NATIVE) {
            this.page.backgroundColor = new Color(1, 0, 169, 157);
            this.page.backgroundSpanUnderStatusBar = true;
            this.page.actionBarHidden = true;
        }

        this.loginSuccess$.subscribe(s => {
            if (s) {
                (this.routerExtensions.router as any).navigate(['/home'], {clearHistory: true});
            }
        });

        this.signupWithGoogleSuccess$.subscribe(s => {
            if (s) {
                this.loader.hide();
                console.log('giddh_app: ', 'Google Login Success Going to home');
                setTimeout(() => {
                    (this.routerExtensions.router as any).navigate(['/home'], {clearHistory: true})
                }, 500);
            }
        });

        if (isIOS) {
            const SocialLogin = require('nativescript-social-login');
            SocialLogin.init({
                google: {
                    initialize: true,
                    isRequestAuthCode: true,
                    scopes: ['profile', 'email'],
                    serverClientId: '641015054140-22m4v5kgtpnedfiq4peo9u3vcojmespu.apps.googleusercontent.com',
                    shouldFetchBasicProfile: true,
                },
                facebook: {
                    initialize: false
                },
                onActivityResult: (requestCode: number, resultCode: number, data: any) => {
                }
            });
        }

    }

    public ngAfterViewInit() {
        // this.setupWebViewInterface();
    }

    // public webViewLoaded(args) {
    //   // var webview:WebView = <WebView>args.object;
    //   // if(isAndroid){
    //   //   webview.android.getSettings().setDisplayZoomControls(false);
    //   // }
    // }

    // public webViewTouch(args) {
    //   console.log("touch event");
    // }

    // public webViewPan(args) {
    //   console.log("pan gesture");
    // }

    public ngOnDestroy(): void {
        // this.lo
        // this.oLangWebViewInterface.destroy();
        // this.oLangWebViewInterface = null;
    }

    // private setupWebViewInterface() {
    //   let webView: WebView = this.webViewRef.nativeElement;

    //   this.oLangWebViewInterface = new webViewInterfaceModule.WebViewInterface(webView, this.secondWebViewSRC);

    //   // loading languages in dropdown, on load of webView.
    //   webView.on(WebView.loadFinishedEvent, (args: LoadEventData) => {
    //     if (!args.error) {
    //       console.log(platformModule.screen.mainScreen.widthPixels);
    //       this.oLangWebViewInterface.emit('width', platformModule.screen.mainScreen.widthPixels);
    //     }
    //   });

    //   // this.listenLangWebViewEvents();
    // }


    /**
     * Handles any event/command emitted by language webview.
     */
    // private listenLangWebViewEvents() {
    //   // handles language selectionChange event.
    //   this.oLangWebViewInterface.on('languageSelection', (selectedLanguage) => {
    //     this.changeDetectorRef.detectChanges();
    //   });
    // }

    public gotoUrl(url: string[], transitionName: string) {
        (this.routerExtensions.router as any).navigateByUrl('/' + url.join('/'), {
            animated: true,
            transition: {
                name: transitionName,
                curve: AnimationCurve.ease
            }
        });
    }

    public login() {
        const formValues = this.loginWithPasswordForm.value;
        formValues.uniqueKey = formValues.uniqueKey.toLowerCase();
        this.store.dispatch(this._loginActions.loginWithPassword(this.loginWithPasswordForm.value));
    }

    public googleLogin() {
        setTimeout(() => {
            this.loader.show(Object.assign({}, defaultLoaderOptions, {message: 'Logging With Google...'}));
        }, 300);
        const SocialLogin = require('nativescript-social-login');
        const androidApp = app.android;
        const result = SocialLogin.init({
            activity: androidApp.foregroundActivity,
            google: {
                initialize: true,
                isRequestAuthCode: true,
                serverClientId: '641015054140-3cl9c3kh18vctdjlrt9c8v0vs85dorv2.apps.googleusercontent.com',
                shouldFetchBasicProfile: true
            },
            facebook: {
                initialize: false
            },
            linkedin: {
                clientId: '75urm0g3386r26',
                clientSecret: '3AJTvaKNOEG4ISJ0',
                permissions: ['r_basicprofile', 'r_emailaddress'],
                state: '',
                redirectUri: 'https://giddh.com/login'
            },

            onActivityResult: (requestCode: number, resultCode: number, data: any) => {
            }
        });
        SocialLogin.loginWithGoogle((result) => {
            if (result.error || !result.authCode) {
                console.log('error: ', result.error);
                console.log('auth_code_err: ', result.authCode);
                this._toaster.errorToast('Something Went Wrong! Please Try Again');
            } else {
                this.authservice.GetAtuhToken(result).pipe(
                    mergeMap((token: any) => this.authservice.LoginWithGoogle(token.access_token)))
                    .subscribe(LoginResult => {
                        console.log('giddh_app: ', 'Got Google Login Result');
                        this.store.dispatch(this._loginActions.signupWithGoogleResponse(LoginResult));
                    }, err => {
                        if (err) {
                            console.log(err);
                            this._toaster.errorToast('Something Went Wrong! Please Try Again');
                            this.loader.hide();
                        }
                    })
            }
        });
    }

    public linkedinLogin() {
        const SocialLogin = require('nativescript-social-login');
        SocialLogin.loginWithLinkedIn((result) => {
            // console.log(JSON.stringify(result));

            if (result.error || !result.authCode) {
                this._toaster.errorToast('Something Went Wrong! Please Try Again');
            } else {
                result.authCode = JSON.parse(result.authCode).accessTokenValue;
                this.store.dispatch(this._loginActions.LinkedInElectronLogin(result.authCode));
            }
        });
    }
}

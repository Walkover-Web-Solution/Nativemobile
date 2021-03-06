import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store';
import { Observable } from 'rxjs/Observable';
import { LoginActions } from '../../../actions/login/login.action';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { VerifyEmailModel, VerifyEmailResponseModel, VerifyMobileModel } from '../../../models/api-models/loginModels';
import { Color, Page, AnimationCurve } from '../../../common/utils/environment';
import { RouterService } from '../../../services/router.service';
import { Config } from '../../../common';

@Component({
    selector: 'ns-login-two-way',
    moduleId: module.id,
    templateUrl: './login-two-way.component.html',
    styleUrls: ['./login-two-way.component.scss']
})
export class LoginTwoWayComponent implements OnInit, OnDestroy {
    public isTwoWayAuthSuccess$: Observable<boolean>;
    public isTwoWayAuthInProcess$: Observable<boolean>;
    public userDetails$: Observable<VerifyEmailResponseModel>;
    public twoWayOthForm: FormGroup;
    constructor(private _fb: FormBuilder, private store: Store<AppState>, private _loginActions: LoginActions, private routerExtensions: RouterService, private page: Page) {
        this.isTwoWayAuthSuccess$ = this.store.select(s => s.login.isTwoWayAuthSuccess);
        this.userDetails$ = this.store.select(p => p.session.user);
        this.isTwoWayAuthInProcess$ = this.store.select(p => p.login.isTwoWayAuthInProcess);
    }

    public ngOnInit(): void {

        this.twoWayOthForm = this._fb.group({
            otp: ['', Validators.required]
        });

        if (Config.IS_MOBILE_NATIVE) {
            this.page.backgroundColor = new Color(1, 0, 169, 157);
            this.page.backgroundSpanUnderStatusBar = true;
            this.page.actionBarHidden = true;
        }

        this.isTwoWayAuthSuccess$.subscribe(s => {
            if (s) {
                (this.routerExtensions.router as any).navigate(['/home'], { clearHistory: true });
            }
        })
    }
    public ngOnDestroy(): void {
        // this.lo
    }

    public verifyTwoWayCode() {
        let user: VerifyEmailResponseModel;
        this.userDetails$.take(1).subscribe(p => user = p);
        let data = new VerifyMobileModel();
        data.countryCode = Number(user.countryCode);
        data.mobileNumber = user.contactNumber;
        data.oneTimePassword = this.twoWayOthForm.value.otp;
        // this.store.dispatch(this._loginActions.VerifyTwoWayAuthRequest(data));
    }
    public backToLogin() {
        (this.routerExtensions.router as any).navigate(['/login'], {
            clearHistory: true, animated: true,
            transition: {
                name: 'slideRight',
                curve: AnimationCurve.ease
            }
        });
    }
}

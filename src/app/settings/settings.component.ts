import {take, takeUntil} from 'rxjs/operators';
import {Component, OnInit, OnDestroy} from '@angular/core';
import {Store} from '@ngrx/store';
import {LoginActions} from '../actions/login/login.action';
import {RouterService} from '../services/router.service';
import {AppState} from '../store';
import {ToasterService} from '../services/toaster.service';
import {Config} from '../common';
import {Observable, ReplaySubject} from 'rxjs';
import {AuthService} from 'ng4-social-login';

const width = window.innerWidth;

@Component({
    selector: 'ns-settings',
    moduleId: module.id,
    templateUrl: './settings.component.html',
    styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy {
    public items: Array<{ icon: string, text: string, path: string }>;
    public width: number = width;
    public isLoggedInWithSocialAccount$: Observable<boolean>;
    private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

    constructor(private routerExtensions: RouterService, private store: Store<AppState>, private _loginActions: LoginActions,
                private _toasterService: ToasterService, private socialAuthService: AuthService) {
        this.items = [
            {text: 'Company Profile', icon: String.fromCharCode(0x61), path: 'company-profile'},
            {text: 'Currencies', icon: String.fromCharCode(0x61), path: 'currencies'},
            {text: 'Taxes', icon: String.fromCharCode(0x62), path: 'taxes'},
            // { text: 'Permission', icon: String.fromCharCode(0x68), path: '' },
            {text: 'Logout', icon: String.fromCharCode(0x67), path: ''},
        ];
        this.isLoggedInWithSocialAccount$ = this.store.select(p => p.login.isLoggedInWithSocialAccount).pipe(takeUntil(this.destroyed$));
    }

    public ngOnInit() {

    }

    public doAction(item) {
        if (item.text === 'Logout') {
            this._toasterService.confirm({
                title: 'Logout',
                message: 'Are you sure you want to logout?',
                okButtonText: 'Yes',
                cancelButtonText: 'No'
            }).then(r => {
                if (r) {
                    this.isLoggedInWithSocialAccount$.pipe(take(1)).subscribe((val) => {
                        if (val) {
                            this.socialAuthService.signOut().then(() => {
                                this.store.dispatch(this._loginActions.logout());
                                this.store.dispatch(this._loginActions.socialLogoutAttempt());
                            }).catch(() => {
                                this.store.dispatch(this._loginActions.logout());
                                this.store.dispatch(this._loginActions.socialLogoutAttempt());
                            });
                        } else {
                            this.store.dispatch(this._loginActions.logout());
                        }
                    });
                    this.store.dispatch(this._loginActions.logout());
                    (this.routerExtensions.router as any).navigateByUrl('/login', {clearHistory: true});
                }
            });
        } else {
            (this.routerExtensions.router as any).navigate(['/settings', item.path]);
        }
    }

    public goBack() {
        if (Config.IS_MOBILE_NATIVE) {
            (this.routerExtensions.router as any).back()
        } else {
            (this.routerExtensions.router as any).navigate(['/home']);
        }
    }

    public ngOnDestroy(): void {
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }
}

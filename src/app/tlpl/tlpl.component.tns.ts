import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Store} from '@ngrx/store';
import * as _ from 'lodash';
import {createSelector} from 'reselect';
import {ReplaySubject} from 'rxjs//ReplaySubject';
import {Observable} from 'rxjs/Observable';
import {CompanyActions} from '../actions/company/company.action';
import {TBPlBsActions} from '../actions/tl-pl/tl-pl.actions';
import {CompanyResponse} from '../models/api-models/Company';
import {AccountDetails, TrialBalanceRequest} from '../models/api-models/tb-pl-bs';
import {AppState} from '../store';
import {RouterService} from '../services/router.service';
import {Account, ChildGroup} from '../models/api-models/Search';
import {INameUniqueName} from '../models/interfaces/nameUniqueName.interface';
import {defaultLoaderOptions, Page} from '../common/utils/environment';
import {LoadingIndicator} from 'nativescript-loading-indicator';
import {Subscription} from 'rxjs/Subscription';
import 'rxjs/add/operator/debounceTime';
import * as app from 'application';
import {isAndroid} from 'platform';

declare let android: any;

@Component({
    selector: 'ns-tlpl',
    moduleId: module.id,
    templateUrl: './tlpl.component.html',
    styleUrls: ['./tlpl.component.scss'],
    // changeDetection: ChangeDetectionStrategy.OnPush
})
export class TlPlComponent implements OnInit, OnDestroy, AfterViewInit {
    public loader: LoadingIndicator;
    @ViewChild('searchControl') public searchControl: ElementRef;
    public activeCompany: CompanyResponse;
    public companyData$: Observable<{ companies: CompanyResponse[], uniqueName: string }>;
    public request: TrialBalanceRequest;
    public data$: Observable<AccountDetails>;
    public showLoader$: Observable<boolean>;
    public filterdData: ChildGroup[] = [];
    public breadCrumb: INameUniqueName[] = [];
    public activeGrp: ChildGroup = null;
    public activeAcc: string = '';
    public flattenGrpDetails: any[] = [];
    public searchedFlattenGrpDetails: any[] = [];
    public isSearchEnabled: boolean = false;
    public showLedgerScreen: boolean = false;
    private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
    private loaderSubcriber$: Subscription;

    constructor(private store: Store<AppState>, private _companyActions: CompanyActions, public _tlPlActions: TBPlBsActions,
                private _routerExtension: RouterService, private _cdRef: ChangeDetectorRef, private page: Page) {
        this.showLoader$ = this.store.select(s => s.tlPl.tb.showLoader).takeUntil(this.destroyed$);
        this.companyData$ = this.store.select(createSelector([(state: AppState) => state.session.companies, (state: AppState) => state.session.companyUniqueName], (companies, uniqueName) => {
            return {companies, uniqueName};
        })).takeUntil(this.destroyed$);
        this.data$ = this.store.select(s => s.tlPl.tb.data).takeUntil(this.destroyed$);
        (this.page as any).on((Page as any).unloadedEvent, (ev) => {
            this.ngOnDestroy()
        });
    }

    ngOnInit(): void {
        this.loader = new LoadingIndicator();
        console.log(JSON.stringify('loading tbpl'));
        this.companyData$.subscribe(res => {
            console.log(JSON.stringify('getting company data'));
            if (!res.companies) {
                return;
            }
            console.log(JSON.stringify('getting active company'));
            this.activeCompany = res.companies.find(cmp => {
                return cmp.uniqueName === res.uniqueName;
            });
            console.log(JSON.stringify('preparing request'));
            this.request = {
                refresh: false,
                from: this.activeCompany.activeFinancialYear.financialYearStarts,
                to: this.activeCompany.activeFinancialYear.financialYearEnds
            };
            console.log(JSON.stringify('calling get data'));
            this.getData(this.request);
        });
        this.loaderSubcriber$ = this.showLoader$.subscribe(s => {
            if (s && this.loader) {
                console.log(JSON.stringify('Hey I am called'));
                this.loader.show(Object.assign({}, defaultLoaderOptions, {message: 'Loading TL / PL...'}));
            } else {
                this.loader.hide();
            }
        });

        this.data$.subscribe(p => {
            let d = _.cloneDeep(p) as AccountDetails;
            if (d) {
                this.InitData(d.groupDetails);
                d.groupDetails.forEach(g => {
                    g.isVisible = true;
                    g.isCreated = true;
                });
                this.filterdData = d.groupDetails;

                this.flattenGrpDetails = this.makeFlatten(d.groupDetails, []);
                this.detectChanges();
            }
        });
    }

    ngAfterViewInit() {

        if (isAndroid) {
            app.android.on(app.AndroidApplication.activityBackPressedEvent, function (d) {
                console.log('back btn event');
            });
        }
    }

    search(term) {
        this.searchGWA(term);
    }

    InitData(d: ChildGroup[]) {
        _.each(d, (grp: ChildGroup) => {
            grp.isVisible = false;
            grp.isCreated = false;
            grp.isIncludedInSearch = true;

            _.each(grp.accounts, (acc: Account) => {
                acc.isIncludedInSearch = true;
                acc.isCreated = false;
                acc.isVisible = false;
            });
            if (grp.childGroups) {
                this.InitData(grp.childGroups);
            }
        });
    }

    goBack() {
        this.hideKeyboard();
        (this._routerExtension.router as any).back()
    }

    getData(request: TrialBalanceRequest) {
        console.log(JSON.stringify('action dispatched'));
        this.store.dispatch(this._tlPlActions.GetTrialBalance(_.cloneDeep(request)));
    }

    filterData(grp: ChildGroup) {
        this.showLedgerScreen = false;
        this.activeGrp = grp;

        // if (this.breadCrumb.length > 1) {
        this.breadCrumb.push({uniqueName: grp.uniqueName, name: grp.groupName});
        // }
        this.filterdData = grp.childGroups;
    }

    resetNavigation() {
        this.breadCrumb = [];
        this.data$.subscribe(p => {
            let d = _.cloneDeep(p) as AccountDetails;
            if (d) {
                this.InitData(d.groupDetails);
                d.groupDetails.forEach(g => {
                    g.isVisible = true;
                    g.isCreated = true;
                });
                this.filterdData = d.groupDetails;
            }
        });
        this.activeAcc = '';
        this.activeGrp = null;
    }

    navigateTo(uniqueName: string) {
        this.activeAcc = '';
        this.data$.take(1).subscribe(p => {
            let d = _.cloneDeep(p) as AccountDetails;
            let result = this.loopOver(d.groupDetails, uniqueName, null);
            this.activeGrp = result;
            this.filterdData = result.childGroups;
        });
        let index = this.breadCrumb.findIndex(f => f.uniqueName === uniqueName);
        this.breadCrumb = this.breadCrumb.filter((f, i) => {
            return i <= index;
        });
    }

    loopOver(grps: ChildGroup[], uniqueName: string, res: ChildGroup): ChildGroup {
        if (res) {
            return res;
        }
        grps.forEach(g => {
            if (g.uniqueName === uniqueName) {
                res = g;
                return res;
            }

            if (g.childGroups) {
                res = this.loopOver(g.childGroups, uniqueName, res);
                if (res) {
                    return res;
                }
            }
        });
        return res;
    }

    goToLedger(acc: Account) {
        this.activeGrp = null;
        this.activeAcc = acc.uniqueName;
        this.breadCrumb.push({uniqueName: acc.uniqueName, name: acc.name});
        this.detectChanges();
    }

    makeFlatten(mainGrps: ChildGroup[], result: any[], parentGrpUniqueName?: string) {

        _.each(mainGrps, (g) => {
            result.push(Object.assign({}, g, {isGroup: true, parentGrpUniqueName: parentGrpUniqueName}));

            if (g.childGroups && g.childGroups.length > 0) {
                this.makeFlatten(g.childGroups, result, g.uniqueName);
            }

            if (g.accounts && g.accounts.length > 0) {
                g.accounts = g.accounts.map(acc => {
                    acc.parentGrpUniqueName = g.uniqueName;
                    return acc;
                });
                result.push.apply(result, g.accounts);
                // result.push(...g.accounts);
            }
        });
        return result;
    }

    searchGWA(term: string) {
        if (term === '') {
            this.isSearchEnabled = false;
        } else {
            if (term.startsWith(' ')) {
                return;
            }
            this.isSearchEnabled = true;

            this.searchedFlattenGrpDetails = this.flattenGrpDetails.filter(fla => {
                if (fla.isGroup) {
                    return ((fla.groupName.toLowerCase().indexOf(term.toLowerCase()) > -1) || (fla.uniqueName.toLowerCase().indexOf(term.toLowerCase()) > -1))
                } else {
                    return ((fla.name.toLowerCase().indexOf(term.toLowerCase()) > -1) || (fla.uniqueName.toLowerCase().indexOf(term.toLowerCase()) > -1))
                }
            });
        }
        this.detectChanges();
    }

    searchResultClicked(res) {
        this.isSearchEnabled = false;
        if (res.isGroup) {
            this.activeGrp = res;
            this.activeAcc = '';
        } else {
            this.activeAcc = res.uniqueName;
            this.activeGrp = null;
        }
        this.searchWithNavigation(res);
        this.detectChanges();
    }

    searchWithNavigation(res) {
        this.breadCrumb = [];

        if (res.parentGrpUniqueName) {
            let r = this.genBreadcrumb(res.parentGrpUniqueName, []);
            if (r && r.length) {
                this.data$.take(1).subscribe(p => {
                    let d = _.cloneDeep(p) as AccountDetails;
                    let result = this.loopOver(d.groupDetails, res.isGroup ? res.uniqueName : res.parentGrpUniqueName, null);
                    this.filterdData = result.childGroups;
                });
                r.reverse().forEach(a => {
                    this.breadCrumb.push({uniqueName: a.uniqueName, name: a.isGroup ? a.groupName : a.name});
                });
            } else {
                this.filterdData = res.childGroups;
            }
        } else {
            this.filterdData = res.childGroups;
        }
        this.breadCrumb.push({uniqueName: res.uniqueName, name: res.isGroup ? res.groupName : res.name});
        // this.detectChanges();
    }

    genBreadcrumb(uniqueName: string, res) {
        for (let i = 0; i < this.flattenGrpDetails.length; i++) {
            if (this.flattenGrpDetails[i].uniqueName === uniqueName) {
                res.push(this.flattenGrpDetails[i]);
                if (!this.flattenGrpDetails[i].parentGrpUniqueName) {
                    return res;
                } else {
                    res = this.genBreadcrumb(this.flattenGrpDetails[i].parentGrpUniqueName, res);
                    if (res) {
                        return res;
                    }
                }
            }
        }
        return res;
    }

    detectChanges() {
        if (!this._cdRef['destroyed']) {
            this._cdRef.detectChanges();
        }
    }

    private hideKeyboard() {

        if (isAndroid) {
            try {
                let activity = app.android.foregroundActivity;
                let Context = app.android.currentContext;
                let inputManager = Context.getSystemService(android.content.Context.INPUT_METHOD_SERVICE);
                inputManager.hideSoftInputFromWindow(activity.getCurrentFocus().getWindowToken(), android.view.inputmethod.InputMethodManager.HIDE_NOT_ALWAYS);
            } catch (err) {
                console.log(err);
            }
        }
    }

    ngOnDestroy(): void {
        if (this.loaderSubcriber$) {
            console.log(JSON.stringify('unsubcribed'));
            this.loaderSubcriber$.unsubscribe();
        }
        this.store.dispatch(this._tlPlActions.RESET_LOADER());
        console.log(JSON.stringify('unloading page'));
        this.destroyed$.next(true);
        this.destroyed$.complete();

    }
}

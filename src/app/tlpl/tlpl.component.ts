import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
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
import {fromEvent} from 'rxjs/observable/fromEvent';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';

@Component({
    selector: 'ns-tlpl',
    moduleId: module.id,
    templateUrl: './tlpl.component.html',
    styleUrls: ['./tlpl.component.scss']
})
export class TlPlComponent implements OnInit, OnDestroy, AfterViewInit {
    @ViewChild('searchControl') public searchControl: ElementRef;
    public activeCompany: CompanyResponse;
    public companyData$: Observable<{ companies: CompanyResponse[], uniqueName: string }>;
    public request: TrialBalanceRequest;
    public data$: Observable<AccountDetails>;
    public filterdData: ChildGroup[] = [];
    public breadCrumb: string[] = [];
    public activeGrp: string = '';
    public activeAcc: string = '';
    public flattenGrpDetails: any[] = [];
    public searchedFlattenGrpDetails: any[] = [];
    public isSearchEnabled: boolean = false;
    public showLedgerScreen: boolean = false;
    private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

    constructor(private store: Store<AppState>, private _companyActions: CompanyActions, public _tlPlActions: TBPlBsActions,
                private _routerExtension: RouterService) {
        this.companyData$ = this.store.select(createSelector([(state: AppState) => state.session.companies, (state: AppState) => state.session.companyUniqueName], (companies, uniqueName) => {
            return {companies, uniqueName};
        })).takeUntil(this.destroyed$);
        this.data$ = this.store.select(s => s.tlPl.tb.data).takeUntil(this.destroyed$);
    }

    ngOnInit(): void {
        this.companyData$.subscribe(res => {
            if (!res.companies) {
                return;
            }

            this.activeCompany = res.companies.find(cmp => {
                return cmp.uniqueName === res.uniqueName;
            });

            this.request = {
                refresh: false,
                from: this.activeCompany.activeFinancialYear.financialYearStarts,
                to: this.activeCompany.activeFinancialYear.financialYearEnds
            };
            this.getData(this.request);
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
            }
        });

        this.store.dispatch(this._tlPlActions.GetflatAccountWGroups());
    }

    ngAfterViewInit() {
        fromEvent<KeyboardEvent>(this.searchControl.nativeElement, 'input').pipe(
            debounceTime(700),
            distinctUntilChanged(),
            map((t: any) => t.target.value)
        ).subscribe(data => {
            this.searchGWA(data);
        })
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
        this._routerExtension.router.navigate(['/home']);
    }

    getData(request: TrialBalanceRequest) {
        this.store.dispatch(this._tlPlActions.GetTrialBalance(_.cloneDeep(request)));
    }

    filterData(grp: ChildGroup) {
        this.showLedgerScreen = false;
        this.activeGrp = grp.uniqueName;
        if (grp.category !== null) {
            this.breadCrumb = [];
        }
        this.breadCrumb.push(grp.uniqueName);
        this.filterdData.filter(p => {
            return p.groupName === grp.groupName;
        }).map(d => {
            this.filterdData = d.childGroups;
        });
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
    }

    navigateTo(uniqueName: string) {
        this.activeGrp = uniqueName;
        this.data$.subscribe(p => {
            let d = _.cloneDeep(p) as AccountDetails;
            let result = this.loopOver(d.groupDetails, uniqueName, null);
            this.filterdData = result.childGroups;
        });
        let index = this.breadCrumb.findIndex(f => f === uniqueName);
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
        this.activeAcc = acc.uniqueName;
        this.showLedgerScreen = true;
    }

    makeFlatten(mainGrps: ChildGroup[], result: any[], parentGrpUniqueName?: string) {

        _.each(mainGrps, (g) => {
            result.push({...g, isGroup: true, parentGrpUniqueName: parentGrpUniqueName});

            if (g.childGroups && g.childGroups.length > 0) {
                this.makeFlatten(g.childGroups, result, g.uniqueName);
            }

            if (g.accounts && g.accounts.length > 0) {
                g.accounts = g.accounts.map(acc => {
                    acc.parentGrpUniqueName = g.uniqueName;
                    return acc;
                });
                result.push(...g.accounts);
            }
        });
        return result;
    }

    searchGWA(term: string) {
        if (term === '') {
            this.isSearchEnabled = false;
            return;
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
    }

    searchResultClicked(res) {
        this.isSearchEnabled = false;
        if (res.isGroup) {
            this.searchWithNavigation(res);
        } else {

        }
    }

    searchWithNavigation(res) {
        let r = this.genBreadcrumb(res.uniqueName, []);
        if (r && r.length) {
            this.activeGrp = r[0].uniqueName;
            this.data$.take(1).subscribe(p => {
                let d = _.cloneDeep(p) as AccountDetails;
                let result = this.loopOver(d.groupDetails, this.activeGrp, null);
                this.filterdData = result.childGroups;
            });

            this.breadCrumb = [];
            r.reverse().forEach(a => {
                this.breadCrumb.push(a.uniqueName);
            });
        }
    }

    genBreadcrumb(uniqueName: string, res) {
        this.flattenGrpDetails.forEach(fa => {
            if (fa.uniqueName === uniqueName) {
                res.push(fa);
                if (!fa.parentGrpUniqueName) {
                    return res;
                } else {
                    this.genBreadcrumb(fa.parentGrpUniqueName, res);
                }
            }
        });

        return res;
    }

    ngOnDestroy(): void {
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }
}

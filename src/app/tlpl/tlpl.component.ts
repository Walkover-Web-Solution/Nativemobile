import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
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

@Component({
    selector: 'ns-tlpl',
    moduleId: module.id,
    templateUrl: './tlpl.component.html'
})
export class TlPlComponent implements OnInit, OnDestroy {
    public activeCompany: CompanyResponse;
    public companyData$: Observable<{ companies: CompanyResponse[], uniqueName: string }>
    public request: TrialBalanceRequest;
    @ViewChild('searchControl') searchControl: ElementRef;
    public data$: Observable<AccountDetails>;
    public filterdData: ChildGroup[] = [];
    public breadCrumb: string[] = [];
    public activeGrp: string = '';
    public flattenGrpDetails: any[] = [];
    public isSearchEnabled: boolean = false;
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
        debugger;
    }

    makeFlatten(mainGrps: ChildGroup[], result: any[]) {

        _.each(mainGrps, (g) => {
            result.push({ ...g, isGroup: true });

            if (g.childGroups) {
                this.makeFlatten(g.childGroups, result);
            }

            if(g.accounts) {
                result.push(...g.accounts, { isGroup: false });
            }
        });
        return result;
    }

    searchGWA(term: string) {
        return this.flattenGrpDetails.filter(fla => {
            if (fla.isGroup) {
                return (fla.groupName.toLowerCase().indexOf(fla.toLowerCase() === 0) || (fla.uniqueName.toLowerCase().indexOf(fla.toLowerCase() === 0)))
            } else {
                return (fla.name.toLowerCase().indexOf(fla.toLowerCase() === 0) || (fla.uniqueName.toLowerCase().indexOf(fla.toLowerCase() === 0)))
            }
        });
    }

    ngOnDestroy(): void {
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }
}

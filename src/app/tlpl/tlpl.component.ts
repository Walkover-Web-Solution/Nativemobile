import { Component, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import * as _ from 'lodash';
import { createSelector } from "reselect";
import { ReplaySubject } from "rxjs//ReplaySubject";
import { Observable } from "rxjs/Observable";
import { CompanyActions } from "../actions/company/company.action";
import { TBPlBsActions } from "../actions/tl-pl/tl-pl.actions";
import { CompanyResponse } from "../models/api-models/Company";
import { TrialBalanceRequest } from "../models/api-models/tb-pl-bs";
import { IFlattenGroupsAccountsDetail } from "../models/interfaces/flattenGroupsAccountsDetail.interface";
import { AppState } from "../store";
import { TlPlFlGWAList, TlPlVM } from "./tlpl.vm";
import { RouterService } from "../services/router.service";
import { FormControl } from "@angular/forms";
import { startWith, map } from "rxjs/operators";

@Component({
    selector: 'ns-tlpl',
    moduleId: module.id,
    templateUrl: './tlpl.component.html'
})
export class TlPlComponent implements OnInit, OnDestroy {
    public activeCompany: CompanyResponse;
    public companyData$: Observable<{ companies: CompanyResponse[], uniqueName: string }>
    public flatAccountWGroupsList$: Observable<IFlattenGroupsAccountsDetail[]>;
    public GWAItems: TlPlFlGWAList[] = [];
    public GWAFilterdItems$: Observable<TlPlFlGWAList[]>;
    public isFlyAccountInProcess$: Observable<boolean>;
    public request: TrialBalanceRequest;
    public tlplVm: TlPlVM;
    searchControl = new FormControl();
    private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

    constructor(private store: Store<AppState>, private _companyActions: CompanyActions, public _tlPlActions: TBPlBsActions,
        private _routerExtension: RouterService) {
        this.tlplVm = new TlPlVM();
        this.companyData$ = this.store.select(createSelector([(state: AppState) => state.session.companies, (state: AppState) => state.session.companyUniqueName], (companies, uniqueName) => {
            return { companies, uniqueName };
        })).takeUntil(this.destroyed$);
        this.flatAccountWGroupsList$ = this.store.select(s => s.tlPl.flattenGroupsAccounts).takeUntil(this.destroyed$);
        this.isFlyAccountInProcess$ = this.store.select(s => s.tlPl.isFlyAccountInProcess).takeUntil(this.destroyed$);
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
            this.filterData(this.request);
        });

        this.flatAccountWGroupsList$.subscribe(res => {
            this.GWAItems = this.tlplVm.prepareFlGWAList(res);
        });

        this.store.dispatch(this._tlPlActions.GetflatAccountWGroups());

        this.GWAFilterdItems$ = this.searchControl.valueChanges.
            pipe(
                startWith<string | TlPlFlGWAList>(''),
                map(val => typeof val === 'string' ? val : val.name),
                map(name => this.filterGWA(name))
            )
    }

    goBack() {
        this._routerExtension.router.navigate(['/home']);
    }

    filterData(request: TrialBalanceRequest) {
        this.store.dispatch(this._tlPlActions.GetTrialBalance(_.cloneDeep(request)));
    }

    filterGWA(term: string): TlPlFlGWAList[] {
        return this.GWAItems.filter(gw => {
           return (gw.name.toLowerCase().indexOf(term.toLowerCase()) === 0) || (gw.uniqueName.toLowerCase().indexOf(term.toLowerCase()) === 0)
        });
    }

    displayFn4GWA(GWA: TlPlFlGWAList) {
        return GWA ? GWA.name : undefined;
    }

    ngOnDestroy(): void {
        this.destroyed$.next(true);
        this.destroyed$.complete();
    }
}

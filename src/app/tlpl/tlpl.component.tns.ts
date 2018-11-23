import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
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
// const platformModule = require('tns-core-modules/platform');
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

import { ModalDialogService } from "nativescript-angular/directives/dialogs";
import { TlplFilterComponent } from './tlpl-filter/tlpl-filter.component';
import {ChartCustomFilter, ChartFilterConfigs} from '../models/api-models/Dashboard';
import {ChartFilterType} from '../models/interfaces/dashboard.interface';
import {ActiveFinancialYear} from '../models/api-models/Company';
import { MyDrawerItem } from '../shared/my-drawer-item/my-drawer-item';
import * as moment from 'moment/moment';

declare let android: any;

@Component({
    selector: 'ns-tlpl',
    moduleId: module.id,
    templateUrl: './tlpl.component.html',
    styleUrls: ['./tlpl.component.css'],
    // changeDetection: ChangeDetectionStrategy.OnPush
})
export class TlPlComponent implements OnInit, OnDestroy, AfterViewInit {
    public loader: LoadingIndicator;
    public icon = String.fromCharCode(0xf002);
    public navItemObj$: Observable<MyDrawerItem[]>;
    @ViewChild("drawer") public drawerComponent: any;
    @ViewChild('searchControl') public searchControl: ElementRef;
    public activeCompany: CompanyResponse;
    public companyData$: Observable<{ companies: CompanyResponse[], uniqueName: string }>;
    public request: TrialBalanceRequest;
    public data$: Observable<AccountDetails>;
    public showLoader$: Observable<boolean>;
    public mergedGroupAndAccountData: any[] = [];
    public mergedGroupAndAccountData$: BehaviorSubject<ChildGroup[]> = new BehaviorSubject([]);
    public filterdData: ChildGroup[] = [];
    public breadCrumb: INameUniqueName[] = [];
    public activeGrp: ChildGroup = null;
    public activeAcc: string = '';
    public flattenGrpDetails: any[] = [];
    public searchedFlattenGrpDetails: any[] = [];
    public searchedFlattenGrpDetails$: BehaviorSubject<any []> = new BehaviorSubject([]);
    public isSearchEnabled: boolean = false;
    public showLedgerScreen: boolean = false;
    private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
    private loaderSubcriber$: Subscription;
    public selectedFilter$: Observable<ChartFilterType>;
    public customFilterObj: ChartCustomFilter;
    public newDate;
    public sortByNameSwitch: boolean = true;
    public isDataSortedByName: boolean = false;
    public sortByClosingBalanceSwitch: boolean = true;
    public isDataSortedByClosingBalance: boolean = false;
    private _sideDrawerTransition: any;
    constructor(private store: Store<AppState>, private _companyActions: CompanyActions, public _tlPlActions: TBPlBsActions,
                private _routerExtension: RouterService, private _cdRef: ChangeDetectorRef, private page: Page, private modal: ModalDialogService, private vcRef: ViewContainerRef) {
                    this.navItemObj$ = this.store.select(p => p.general.navDrawerObj).map(p => {
                        for (const iterator of p) {
                            if (iterator.router) {
                                if (iterator.router === '/tl-pl') {
                                    iterator.isSelected = true;
                                } else {
                                    iterator.isSelected = false;
                                }
                            }
                        }
                        return p;
                    });
        this.selectedFilter$ = this.store.select(s => s.tlPl.tlplFilter).distinctUntilChanged().takeUntil(this.destroyed$);
        this.store.select(s => s.tlPl.tlplCustomFilter).takeUntil(this.destroyed$).subscribe(s => {this.customFilterObj = s;});
        this.showLoader$ = this.store.select(s => s.tlPl.tb.showLoader).takeUntil(this.destroyed$);
        this.companyData$ = this.store.select(createSelector([(state: AppState) => state.session.companies, (state: AppState) => state.session.companyUniqueName], (companies, uniqueName) => {
            return {companies, uniqueName};
        })).takeUntil(this.destroyed$);
        this.data$ = this.store.select(s => s.tlPl.tb.data).takeUntil(this.destroyed$);
        (this.page as any).on((Page as any).unloadedEvent, (ev) => {
            this.ngOnDestroy();
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
                // this.filterdData$.next(_.cloneDeep(this.filterdData));
                this.mergeGroupAndAccount();
                this.flattenGrpDetails = this.makeFlatten(d.groupDetails, []);
                this.detectChanges();
            }
        });

        this.selectedFilter$.subscribe(s => {
            console.log('----------------')
            console.log('Custom Filter Date')
            console.log(this.customFilterObj)
            console.log('----------------')
            this.newDate = this.parseDates(s, this.activeCompany.financialYears[0], this.activeCompany.financialYears[1], this.customFilterObj)
            this.isDataSortedByClosingBalance = false
            this.isDataSortedByName = false
            let areq = {
                refresh: false,
                from: this.newDate.activeYear.startDate,
                to: this.newDate.activeYear.endDate
            };
            this.store.dispatch(this._tlPlActions.GetTrialBalance(areq));
            console.log('++++++++++++++++')
            console.log(areq)
            console.log('++++++++++++++++')
        });

    }

    ngAfterViewInit() {

        // if (isAndroid) {
        //     app.android.on(app.AndroidApplication.activityBackPressedEvent, function (d) {
        //         console.log('back btn event');
        //     });
        // }
    }

    openFilter(){
        let options = {
            context: {},
            fullscreen: true,
            viewContainerRef: this.vcRef
        };
        this.modal.showModal(TlplFilterComponent, options).then(res => {
            console.log(res);
        });
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
        // this.hideKeyboard();
        (this._routerExtension.router as any).back()
    }

    getData(request: TrialBalanceRequest) {
        console.log(JSON.stringify('action dispatched'));
        this.store.dispatch(this._tlPlActions.GetTrialBalance(_.cloneDeep(request)));
    }

    refreshData(request: TrialBalanceRequest) {
        this.resetNavigation();
        let a = {
            refresh: true,
            from: this.newDate.activeYear.startDate,
            to: this.newDate.activeYear.endDate
        };
        this.store.dispatch(this._tlPlActions.GetTrialBalance(_.cloneDeep(a)));
    }

    sortGroupByName(){
        this.isDataSortedByClosingBalance = false
        this.isDataSortedByName = true
        this.sortByNameSwitch = !this.sortByNameSwitch;
        let oderData;
        if(this.sortByNameSwitch == true){
            oderData = 'asc';
        }
        else{
            oderData = 'desc';
        }
        this.mergedGroupAndAccountData = _.orderBy(this.mergedGroupAndAccountData, [function(o) { return o.groupName; }], oderData);
        this.mergedGroupAndAccountData$.next(_.cloneDeep(this.mergedGroupAndAccountData));

    }
    sortGroupByClosingBalance(){
        this.isDataSortedByName = false;
        this.isDataSortedByClosingBalance = true
        this.sortByClosingBalanceSwitch = !this.sortByClosingBalanceSwitch;
        let oderData;
        if(this.sortByClosingBalanceSwitch == true){
            oderData = 'asc';
        }
        else{
            oderData = 'desc';
        }
        this.mergedGroupAndAccountData = _.orderBy(this.mergedGroupAndAccountData, [function(o) { return o.closingBalance.amount; }], oderData);
        this.mergedGroupAndAccountData$.next(_.cloneDeep(this.mergedGroupAndAccountData));
    }

    itemTap(item: any) {
        if (item.isGroup) {
            this.filterData(item);
        } else {
            this.goToLedger(item);
        }
    }

    filterData(grp: ChildGroup) {
        this.isDataSortedByClosingBalance = false
        this.isDataSortedByName = false
        this.showLedgerScreen = false;
        this.activeGrp = grp;
        // this.activeGrpAccount$.next(_.cloneDeep(this.activeGrp.accounts));
        // if (this.breadCrumb.length > 1) {
        this.breadCrumb.push({uniqueName: grp.uniqueName, name: grp.groupName});
        // }
        this.filterdData = grp.childGroups;
        // this.filterdData$.next(_.cloneDeep(this.filterdData));
        this.mergeGroupAndAccount();
    }

    resetNavigation() {
        this.isDataSortedByClosingBalance = false
        this.isDataSortedByName = false
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
                // this.filterdData$.next(_.cloneDeep(this.filterdData));
                this.mergeGroupAndAccount();
            }
        });
        this.activeAcc = '';
        this.activeGrp = null;
        // this.activeGrpAccount$.next([]);
        this.mergeGroupAndAccount();
    }

    navigateTo(uniqueName: string) {
        this.isDataSortedByClosingBalance = false
        this.isDataSortedByName = false
        this.activeAcc = '';
        this.data$.take(1).subscribe(p => {
            let d = _.cloneDeep(p) as AccountDetails;
            let result = this.loopOver(d.groupDetails, uniqueName, null);
            this.activeGrp = result;
            // this.activeGrpAccount$.next(_.cloneDeep(this.activeGrp.accounts));
            this.filterdData = result.childGroups;
            // this.filterdData$.next(_.cloneDeep(this.filterdData));
            this.mergeGroupAndAccount();
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
        // this.activeGrpAccount$.next([]);
        // this.mergeGroupAndAccount();
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
                    // acc.parentGrpUniqueName = g.uniqueName;
                    return Object.assign({}, acc, {isGroup: false, parentGrpUniqueName: g.uniqueName});
                });
                result.push.apply(result, g.accounts);
                // result.push(...g.accounts);
            }
        });
        return result;
    }

    mergeGroupAndAccount() {
        this.mergedGroupAndAccountData = [];
        this.mergedGroupAndAccountData.push.apply(this.mergedGroupAndAccountData, this.filterdData.map(g => Object.assign({}, g, {isGroup: true})));
        if (this.activeGrp && this.activeGrp.accounts && this.activeGrp.accounts.length > 0) {
            this.mergedGroupAndAccountData.push.apply(this.mergedGroupAndAccountData, this.activeGrp.accounts.map(g => Object.assign({}, g, {isGroup: false})));
        }
        this.mergedGroupAndAccountData$.next(_.cloneDeep(this.mergedGroupAndAccountData));

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
                // console.log(JSON.stringify(fla));

                if (fla && fla['isGroup']) {
                    return ((fla.groupName.toLowerCase().indexOf(term.toLowerCase()) > -1) || (fla.uniqueName.toLowerCase().indexOf(term.toLowerCase()) > -1))
                } else {
                    return ((fla.name.toLowerCase().indexOf(term.toLowerCase()) > -1) || (fla.uniqueName.toLowerCase().indexOf(term.toLowerCase()) > -1))
                }


            });
            this.searchedFlattenGrpDetails$.next(_.cloneDeep(this.searchedFlattenGrpDetails));
        }
        this.detectChanges();
    }

    searchResultClicked(res) {
        this.isDataSortedByClosingBalance = false
        this.isDataSortedByName = false
        this.isSearchEnabled = false;
        if (res.isGroup) {
            this.activeGrp = res;
            // this.activeGrpAccount$.next(_.cloneDeep(this.activeGrp.accounts));
            this.activeAcc = '';
        } else {
            this.activeAcc = res.uniqueName;
            this.activeGrp = null;
            // this.activeGrpAccount$.next([]);
        }
        this.mergeGroupAndAccount();
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
                    this.mergeGroupAndAccount();
                    // this.filterdData$.next(_.cloneDeep(this.filterdData));
                });
                r.reverse().forEach(a => {
                    this.breadCrumb.push({uniqueName: a.uniqueName, name: a.isGroup ? a.groupName : a.name});
                });
            } else {
                this.filterdData = res.childGroups;
                // this.filterdData$.next(_.cloneDeep(this.filterdData));
                this.mergeGroupAndAccount();
            }

        } else {
            this.filterdData = res.childGroups;
            // this.filterdData$.next(_.cloneDeep(this.filterdData));
            this.mergeGroupAndAccount();
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

                if (activity.getCurrentFocus()) {
                    inputManager.hideSoftInputFromWindow(activity.getCurrentFocus().getWindowToken(), android.view.inputmethod.InputMethodManager.HIDE_NOT_ALWAYS);
                }
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

    public onDrawerButtonTap(): void {
        console.log('Nav')
        // console.log(this.drawerComponent)
        this.drawerComponent.sideDrawer.showDrawer();
    }
    public get sideDrawerTransition(): any {
        return this._sideDrawerTransition;
    }

    parseDates = (filterType: ChartFilterType, activeFinancialYear: ActiveFinancialYear, lastFinancialYear: ActiveFinancialYear, customFilterObj: ChartCustomFilter): ChartFilterConfigs => {
        let config = new ChartFilterConfigs();
        switch (filterType) {
            case ChartFilterType.ThisMonthToDate: // This Month to Date
                config.ChartTitle = 'This Month to Date';
                config.activeYear.startDate = moment().startOf('month').format('DD-MM-YYYY');
                config.activeYear.endDate = moment().format('DD-MM-YYYY');
                config.activeYear.lable = moment().format('MMMM')
    
                config.lastYear.startDate = moment(config.activeYear.startDate, 'DD-MM-YYYY').subtract(1, 'month').format('DD-MM-YYYY');
                config.lastYear.endDate = moment(config.activeYear.endDate, 'DD-MM-YYYY').subtract(1, 'month').endOf('month').format('DD-MM-YYYY');
                config.lastYear.lable = moment(config.activeYear.startDate, 'DD-MM-YYYY').subtract(1, 'month').format('MMMM');
    
                config.legend = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
                return config;
            case ChartFilterType.ThisQuarterToDate: // This Quarter to Date
                config.ChartTitle = 'This Quarter to Date';
                config.activeYear.startDate = moment().quarter(moment().quarter()).startOf('quarter').format('DD-MM-YYYY');
                config.activeYear.endDate = moment().format('DD-MM-YYYY');
                config.activeYear.lable = 'Q' + moment().quarter();
    
                config.lastYear.startDate = moment(config.activeYear.startDate, 'DD-MM-YYYY').quarter(moment().quarter()).startOf('quarter').subtract(1, 'quarter').format('DD-MM-YYYY');
                config.lastYear.endDate = moment(config.activeYear.startDate, 'DD-MM-YYYY').quarter(moment().quarter()).endOf('quarter').subtract(1, 'quarter').format('DD-MM-YYYY');
                config.lastYear.lable = 'Q' + moment(config.activeYear.startDate, 'DD-MM-YYYY').quarter(moment().quarter()).endOf('quarter').subtract(1, 'quarter').quarter();
    
                config.legend = ['Month 1', 'Month 2', 'Month 3'];
                return config;
            case ChartFilterType.ThisFinancialYearToDate: // This Financial Year to Date
                config.ChartTitle = 'This Financial Year to Date';
                let activeLegend = [];
                let lastLegend = [];
                if (activeFinancialYear) {
                    config.activeYear.startDate = moment(activeFinancialYear.financialYearStarts, 'DD-MM-YYYY').startOf('day').format('DD-MM-YYYY');
                    // config.activeYear.endDate = moment(activeFinancialYear.financialYearEnds, 'DD-MM-YYYY').endOf('day').format('DD-MM-YYYY');
                    config.activeYear.endDate = moment().format('DD-MM-YYYY');
                    config.activeYear.lable = 'FY-' + moment(activeFinancialYear.financialYearStarts, 'DD-MM-YYYY').startOf('day').format('YY') + ' - FY-' + moment(activeFinancialYear.financialYearEnds, 'DD-MM-YYYY').endOf('day').format('YY');
    
                    let dateStart = moment(config.activeYear.startDate, 'DD-MM-YYYY');
                    let dateEnd = moment(config.activeYear.endDate, 'DD-MM-YYYY');
                    while (dateEnd > dateStart || dateStart.format('M') === dateEnd.format('M')) {
                        activeLegend.push(dateStart.format('MMM'));
                        dateStart.add(1, 'month');
                    }
                } else {
                    config.activeYear.startDate = '00-00-0000';
                    config.activeYear.endDate = '00-00-0000';
                    config.activeYear.lable = '-None-';
                }
    
                if (lastFinancialYear) {
                    config.lastYear.startDate = moment(lastFinancialYear.financialYearStarts, 'DD-MM-YYYY').startOf('day').format('DD-MM-YYYY');
                    config.lastYear.endDate = moment(lastFinancialYear.financialYearEnds, 'DD-MM-YYYY').endOf('day').format('DD-MM-YYYY');
                    config.lastYear.lable = 'FY-' + moment(lastFinancialYear.financialYearStarts, 'DD-MM-YYYY').startOf('day').format('YY') + ' - FY-' + moment(lastFinancialYear.financialYearEnds, 'DD-MM-YYYY').endOf('day').format('YY');
    
                    let dateStart = moment(config.lastYear.startDate, 'DD-MM-YYYY');
                    let dateEnd = moment(config.lastYear.endDate, 'DD-MM-YYYY');
                    while (dateEnd > dateStart || dateStart.format('M') === dateEnd.format('M')) {
                        lastLegend.push(dateStart.format('MMM'));
                        dateStart.add(1, 'month');
                    }
                } else {
                    config.lastYear.startDate = moment(activeFinancialYear.financialYearStarts, 'DD-MM-YYYY').startOf('day').subtract(1, 'year').format('DD-MM-YYYY');
                    config.lastYear.endDate = moment(activeFinancialYear.financialYearEnds, 'DD-MM-YYYY').endOf('day').subtract(1, 'year').format('DD-MM-YYYY');
                    config.lastYear.lable = 'FY-' + moment(config.lastYear.startDate, 'DD-MM-YYYY').startOf('day').format('YY') + ' - FY-' + moment(config.lastYear.endDate, 'DD-MM-YYYY').endOf('day').format('YY');
    
                    let dateStart = moment(config.lastYear.startDate, 'DD-MM-YYYY');
                    let dateEnd = moment(config.lastYear.endDate, 'DD-MM-YYYY');
                    while (dateEnd > dateStart || dateStart.format('M') === dateEnd.format('M')) {
                        lastLegend.push(dateStart.format('MMM'));
                        dateStart.add(1, 'month');
                    }
                }
    
                config.legend = _.uniq(activeLegend.concat(lastLegend));
                return config;
            case ChartFilterType.ThisYearToDate: // This Year to Date
                config.ChartTitle = 'This Year to Date';
                config.activeYear.startDate = moment().startOf('year').format('DD-MM-YYYY');
                config.activeYear.endDate = moment().format('DD-MM-YYYY');
                config.activeYear.lable = moment().format('YYYY');
    
                config.lastYear.startDate = moment(config.activeYear.startDate, 'DD-MM-YYYY').subtract(1, 'year').format('DD-MM-YYYY');
                config.lastYear.endDate = moment(config.activeYear.endDate, 'DD-MM-YYYY').endOf('year').subtract(1, 'year').format('DD-MM-YYYY');
                config.lastYear.lable = moment(config.activeYear.startDate, 'DD-MM-YYYY').subtract(1, 'year').format('YYYY');
    
                config.legend = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                return config;
            case ChartFilterType.LastMonth: // Last Month
                config.ChartTitle = 'Last Month';
                config.activeYear.startDate = moment().startOf('month').subtract(1, 'month').format('DD-MM-YYYY');
                config.activeYear.endDate = moment().endOf('month').subtract(1, 'month').format('DD-MM-YYYY');
                config.activeYear.lable = moment().startOf('month').subtract(1, 'month').format('MMMM')
    
                config.lastYear.startDate = moment(config.activeYear.startDate, 'DD-MM-YYYY').startOf('month').subtract(1, 'month').format('DD-MM-YYYY');
                config.lastYear.endDate = moment(config.activeYear.endDate, 'DD-MM-YYYY').endOf('month').subtract(1, 'month').format('DD-MM-YYYY');
                config.lastYear.lable = moment(config.activeYear.endDate, 'DD-MM-YYYY').endOf('month').subtract(1, 'month').format('MMMM');
    
                config.legend = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
                return config;
            case ChartFilterType.LastQuater: // Last Quater
                config.ChartTitle = 'Last Quater';
                config.activeYear.startDate = moment().quarter(moment().quarter()).startOf('quarter').subtract(1, 'quarter').format('DD-MM-YYYY');
                config.activeYear.endDate = moment().quarter(moment().quarter()).endOf('quarter').subtract(1, 'quarter').format('DD-MM-YYYY');
                config.activeYear.lable = 'Q' + moment().quarter(moment().quarter()).startOf('quarter').subtract(1, 'quarter').quarter();
    
                config.lastYear.startDate = moment(config.activeYear.startDate, 'DD-MM-YYYY').startOf('quarter').subtract(1, 'quarter').format('DD-MM-YYYY');
                config.lastYear.endDate = moment(config.activeYear.startDate, 'DD-MM-YYYY').endOf('quarter').subtract(1, 'quarter').format('DD-MM-YYYY');
                config.lastYear.lable = 'Q' + moment(config.activeYear.startDate, 'DD-MM-YYYY').endOf('quarter').subtract(1, 'quarter').quarter();
    
                config.legend = ['Month 1', 'Month 2', 'Month 3'];
                return config;
            case ChartFilterType.LastFiancialYear: {
                // Last Fiancial Year
                config.ChartTitle = 'Last Fiancial Year';
                let activeLegend = [];
                let lastLegend = [];
                console.log('financialYearStarts')
                console.log(activeFinancialYear)
                if (activeFinancialYear) {
                    config.activeYear.startDate = moment(activeFinancialYear.financialYearStarts, 'DD-MM-YYYY').startOf('year').subtract(1, 'year').format('DD-MM-YYYY');
                    config.activeYear.endDate = moment(activeFinancialYear.financialYearStarts, 'DD-MM-YYYY').endOf('year').subtract(1, 'year').format('DD-MM-YYYY');
                    config.activeYear.lable = 'FY-' + moment(activeFinancialYear.financialYearStarts, 'DD-MM-YYYY').startOf('year').subtract(1, 'year').format('YY') + ' - FY-' + moment(activeFinancialYear.financialYearEnds, 'DD-MM-YYYY').endOf('year').subtract(1, 'year').format('YY');
    
                    let dateStart = moment(config.activeYear.startDate, 'DD-MM-YYYY');
                    let dateEnd = moment(config.activeYear.endDate, 'DD-MM-YYYY');
                    while (dateEnd > dateStart || dateStart.format('M') === dateEnd.format('M')) {
                        activeLegend.push(dateStart.format('MMM'));
                        dateStart.add(1, 'month');
                    }
                } else {
                    config.activeYear.startDate = '00-00-0000';
                    config.activeYear.endDate = '00-00-0000';
                    config.activeYear.lable = '-None-';
                }
    
                if (lastFinancialYear) {
                    console.log('LAST FINANCIAL YEAR')
                    console.log(lastFinancialYear);
                    config.lastYear.startDate = moment(lastFinancialYear.financialYearStarts, 'DD-MM-YYYY').startOf('year').subtract(1, 'year').format('DD-MM-YYYY');
                    config.lastYear.endDate = moment(lastFinancialYear.financialYearStarts, 'DD-MM-YYYY').endOf('year').subtract(1, 'year').format('DD-MM-YYYY');
                    config.lastYear.lable = 'FY-' + moment(lastFinancialYear.financialYearStarts, 'DD-MM-YYYY').startOf('year').subtract(1, 'year').format('YY') + ' - FY-' + moment(lastFinancialYear.financialYearEnds, 'DD-MM-YYYY').endOf('year').subtract(1, 'year').format('YY');
    
                    let dateStart = moment(config.lastYear.startDate, 'DD-MM-YYYY');
                    let dateEnd = moment(config.lastYear.endDate, 'DD-MM-YYYY');
                    while (dateEnd > dateStart || dateStart.format('M') === dateEnd.format('M')) {
                        lastLegend.push(dateStart.format('MMM'));
                        dateStart.add(1, 'month');
                    }
                } else {
                    config.lastYear.startDate = moment(activeFinancialYear.financialYearStarts, 'DD-MM-YYYY').startOf('year').subtract(2, 'year').format('DD-MM-YYYY');
                    config.lastYear.endDate = moment(activeFinancialYear.financialYearStarts, 'DD-MM-YYYY').endOf('year').subtract(2, 'year').format('DD-MM-YYYY');
                    config.lastYear.lable = 'FY-' + moment(config.lastYear.startDate, 'DD-MM-YYYY').startOf('year').subtract(2, 'year').format('YY') + ' - FY-' + moment(config.lastYear.endDate, 'DD-MM-YYYY').endOf('year').subtract(2, 'year').format('YY');
    
                    let dateStart = moment(config.lastYear.startDate, 'DD-MM-YYYY');
                    let dateEnd = moment(config.lastYear.endDate, 'DD-MM-YYYY');
                    while (dateEnd > dateStart || dateStart.format('M') === dateEnd.format('M')) {
                        lastLegend.push(dateStart.format('MMM'));
                        dateStart.add(1, 'month');
                    }
                }
                config.legend = _.uniq(activeLegend.concat(lastLegend));
                return config;
            }
            case ChartFilterType.LastYear: // Last Year
                config.ChartTitle = 'Last Year';
                config.activeYear.startDate = moment().startOf('year').subtract(1, 'year').format('DD-MM-YYYY');
                config.activeYear.endDate = moment().endOf('year').subtract(1, 'year').format('DD-MM-YYYY');
                config.activeYear.lable = moment().startOf('year').subtract(1, 'year').format('YYYY');
    
                config.lastYear.startDate = moment(config.activeYear.startDate, 'DD-MM-YYYY').startOf('year').subtract(1, 'year').format('DD-MM-YYYY');
                config.lastYear.endDate = moment(config.activeYear.endDate, 'DD-MM-YYYY').endOf('year').subtract(1, 'year').format('DD-MM-YYYY');
                config.lastYear.lable = moment(config.activeYear.startDate, 'DD-MM-YYYY').startOf('year').subtract(1, 'year').format('YYYY');
    
                config.legend = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                return config;
            case ChartFilterType.Custom:
                config.ChartTitle = 'Custom';
                console.log('THIS IS CUSTOM CASE')
                console.log(this.customFilterObj)
    
                config.activeYear.startDate = customFilterObj.activeYear.startDate;
                config.activeYear.endDate = customFilterObj.activeYear.endDate;
                config.activeYear.lable = `${customFilterObj.activeYear.startDate.slice(0, 5)} / ${customFilterObj.activeYear.endDate.slice(0, 5)}`;
    
                config.lastYear.startDate = customFilterObj.lastYear.startDate;
                config.lastYear.endDate = customFilterObj.lastYear.startDate;
                config.lastYear.lable = `${customFilterObj.lastYear.startDate.slice(0, 5)} / ${customFilterObj.lastYear.endDate.slice(0, 5)}`;
    
                config.legend = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                return config;
            default:
                return config;
        }
    };
}

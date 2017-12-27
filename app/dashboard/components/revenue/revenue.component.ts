import { Component, OnInit } from '@angular/core';
import { ObservableArray } from 'tns-core-modules/data/observable-array/observable-array';
import { AppState } from '~/store';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { CompanyResponse, ActiveFinancialYear } from '~/models/api-models/Company';
import { createSelector } from 'reselect';
import * as _ from 'lodash';
import * as moment from 'moment/moment';
import { IRevenueChartClosingBalanceResponse, IChildGroups } from '~/models/interfaces/dashboard.interface';
import { AccountChartDataLastCurrentYear } from '~/models/view-models/AccountChartDataLastCurrentYear';
import { INameUniqueName } from '~/models/interfaces/nameUniqueName.interface';
import { DashboardActions } from '~/actions/dashboard/dashboard.action';
import * as dialogs from "ui/dialogs";
@Component({
  selector: 'ns-revenue-chart',
  moduleId: module.id,
  templateUrl: `./revenue.component.html`
})
export class RevenueChartComponent implements OnInit {
  public activeFinancialYear: ActiveFinancialYear;
  public activeYearAccounts: IChildGroups[] = [];
  public companyData$: Observable<{ companies: CompanyResponse[], uniqueName: string }>
  public revenueChartData$: Observable<IRevenueChartClosingBalanceResponse>;
  public accountStrings: AccountChartDataLastCurrentYear[] = [];
  public activeYearAccountsRanks: ObservableArray<any>;
  public activeYearGrandAmount: number = 0;
  public pieChartAmount: number = 0;
  public chartFilterType$: Observable<string>;
  constructor(private store: Store<AppState>, private _dashboardActions: DashboardActions) {
    this.revenueChartData$ = this.store.select(p => p.dashboard.revenueChart);
    this.companyData$ = this.store.select(createSelector([(state: AppState) => state.session.companies, (state: AppState) => state.session.companyUniqueName], (companies, uniqueName) => {
      return { companies, uniqueName };
    }));
    this.chartFilterType$ = this.store.select(p => p.dashboard.revenueChartFilter);
  }

  ngOnInit() {
    // get activeCompany and set activeFinacial Year
    this.companyData$.subscribe(res => {
      if (!res.companies) {
        return;
      }
      let financialYears = [];
      let activeCmp = res.companies.find(p => p.uniqueName === res.uniqueName);
      if (activeCmp) {
        this.activeFinancialYear = activeCmp.activeFinancialYear;

        if (activeCmp.financialYears.length > 1) {
          financialYears = activeCmp.financialYears.filter(cm => cm.uniqueName !== this.activeFinancialYear.uniqueName);
          financialYears = _.filter(financialYears, (it: ActiveFinancialYear) => {
            let a = moment(this.activeFinancialYear.financialYearStarts, 'DD-MM-YYYY');
            let b = moment(it.financialYearEnds, 'DD-MM-YYYY');

            return b.diff(a, 'days') < 0;
          });
          financialYears = _.orderBy(financialYears, (p: ActiveFinancialYear) => {
            let a = moment(this.activeFinancialYear.financialYearStarts, 'DD-MM-YYYY');
            let b = moment(p.financialYearEnds, 'DD-MM-YYYY');
            return b.diff(a, 'days');
          }, 'desc');
        }

        this.fetchChartData();
      }
    });

    this.revenueChartData$.subscribe(rvn => {
      if (rvn) {
        if (rvn.revenuefromoperationsData && rvn.otherincomeData) {
          let revenuefromoperationsAccounts = [].concat.apply([], rvn.revenuefromoperationsData.childGroups);
          let otherincomeAccounts = [].concat.apply([], rvn.otherincomeData.childGroups);
          let groups = _.unionBy(revenuefromoperationsAccounts as IChildGroups[], otherincomeAccounts as IChildGroups[]) as IChildGroups[];
          this.activeYearAccounts = groups;
          this.generateCharts();
        } else {
          this.resetChartData();
        }
      } else {
        this.resetChartData();
      }
    });

    this.chartFilterType$.subscribe(p => {
      // let begin = moment().format("YYYY-MM-01");
      // let end = moment().format("YYYY-MM-") + moment().date();
      if (p) {
        this.store.dispatch(this._dashboardActions.getRevenueChartData('1-1-2016',
          '31-12-2016', true));
      }
    });
  }

  public generateCharts() {
    this.accountStrings = _.uniqBy(this.generateActiveYearString(), 'uniqueName');
    this.accountStrings.forEach((ac) => {
      ac.activeYear = 0;
      ac.lastYear = 0;
      let index = -1;
      index = _.findIndex(this.activeYearAccounts, (p) => p.uniqueName === ac.uniqueName);
      if (index !== -1) {
        ac.activeYear = this.activeYearAccounts[index].closingBalance.amount;
      }
    });

    this.accountStrings = _.filter(this.accountStrings, (a) => {
      return !(a.activeYear === 0);
    });

    let accounts = [];
    this.accountStrings.forEach(p => {
      accounts.push({ name: p.name, amount: p.activeYear });
    });
    this.activeYearAccountsRanks = new ObservableArray(accounts);
    this.activeYearGrandAmount = _.sumBy(accounts, 'amount');
    this.pieChartAmount = this.activeYearGrandAmount >= 1 ? 100 : 0;
  }

  public generateActiveYearString(): INameUniqueName[] {
    let activeStrings: INameUniqueName[] = [];
    this.activeYearAccounts.map(acc => {
      activeStrings.push({ uniqueName: acc.uniqueName, name: acc.groupName });
    });
    return activeStrings;
  }

  public fetchChartData() {
    this.store.dispatch(this._dashboardActions.getRevenueChartData(this.activeFinancialYear.financialYearStarts,
      this.activeFinancialYear.financialYearEnds, false));
  }

  public calculatePieChartPer(t) {
    let indexTotal = this.activeYearAccountsRanks.getItem(t.pointIndex).amount;
    this.pieChartAmount = Math.round((indexTotal * 100) / this.activeYearGrandAmount);
  }

  public resetChartData() {
    console.log('reset called');
    this.activeYearAccounts = [];
    this.activeYearAccountsRanks = new ObservableArray([]);
    this.activeYearGrandAmount = 0;
    this.pieChartAmount = 0;
  }
}

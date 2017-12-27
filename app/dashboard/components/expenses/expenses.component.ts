import { Component, OnInit } from '@angular/core';
import { ActiveFinancialYear, CompanyResponse } from '~/models/api-models/Company';
import { IChildGroups, IExpensesChartClosingBalanceResponse } from '~/models/interfaces/dashboard.interface';
import { Observable } from 'rxjs';
import * as _ from 'lodash';
import * as moment from 'moment/moment';
import { AppState } from '~/store';
import { Store } from '@ngrx/store';
import { DashboardActions } from '~/actions/dashboard/dashboard.action';
import { INameUniqueName } from '~/models/interfaces/nameUniqueName.interface';
import { AccountChartDataLastCurrentYear } from '~/models/view-models/AccountChartDataLastCurrentYear';
import { ObservableArray } from 'tns-core-modules/data/observable-array/observable-array';
import { createSelector } from 'reselect';

@Component({
  selector: 'ns-expenses-chart',
  moduleId: module.id,
  templateUrl: `./expenses.component.html`
})
export class ExpensesChartComponent implements OnInit {
  public activeFinancialYear: ActiveFinancialYear;
  public activeYearAccounts: IChildGroups[] = [];
  public companyData$: Observable<{ companies: CompanyResponse[], uniqueName: string }>
  public expensesChartData$: Observable<IExpensesChartClosingBalanceResponse>;
  public accountStrings: AccountChartDataLastCurrentYear[] = [];
  public activeYearAccountsRanks: ObservableArray<any>;
  public activeYearGrandAmount: number = 0;
  public pieChartAmount: number = 0;
  constructor(private store: Store<AppState>, private _dashboardActions: DashboardActions) {
    this.expensesChartData$ = this.store.select(p => p.dashboard.expensesChart);
    this.companyData$ = this.store.select(createSelector([(state: AppState) => state.session.companies, (state: AppState) => state.session.companyUniqueName], (companies, uniqueName) => {
      return { companies, uniqueName };
    }));
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

    this.expensesChartData$.subscribe(exp => {
      if (exp) {
        if (exp.operatingcostData && exp.indirectexpensesData) {
          let indirectexpensesGroups = [].concat.apply([], exp.indirectexpensesData.childGroups);
          let operatingcostGroups = [].concat.apply([], exp.operatingcostData.childGroups);
          let accounts = _.unionBy(indirectexpensesGroups as IChildGroups[], operatingcostGroups as IChildGroups[]) as IChildGroups[];
          this.activeYearAccounts = accounts;
        }
      }
      this.generateCharts();
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
    this.store.dispatch(this._dashboardActions.getExpensesChartData(this.activeFinancialYear.financialYearStarts, this.activeFinancialYear.financialYearEnds, false));
  }

  public calculatePieChartPer(t) {
    let indexTotal = this.activeYearAccountsRanks.getItem(t.pointIndex).amount;
    this.pieChartAmount = Math.round((indexTotal * 100) / this.activeYearGrandAmount);
  }
}
